import { useState } from "react";
import Page from "../../../components/layout/Page";
import Button from "../../../components/ui/Button";
import DeleteConfirm from "../../../components/ui/DeleteConfirm";
import type { Column } from "../../../components/ui/Table";
import Table from "../../../components/ui/Table";
import {
  useCreateTrackingMutation,
  useDeleteTrackingMutation,
  useGetTrackingsQuery,
  useUpdateTrackingMutation,
} from "../../../services/tracking.service";
import TrackingForm from "./TrackingForm";

type TrackingType = {
  id: string;
  location?: string;
  timestamp?: string;
  vehicle?: string;
};

const Tracking = () => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<TrackingType | null>(null);
  const [toDelete, setToDelete] = useState<TrackingType | null>(null);

  const { data: points, isLoading, refetch } = useGetTrackingsQuery();
  const [createTracking] = useCreateTrackingMutation();
  const [updateTracking] = useUpdateTrackingMutation();
  const [deleteTracking] = useDeleteTrackingMutation();

  const columns: Column<TrackingType>[] = [
    { key: "location", title: "Lieu" },
    { key: "timestamp", title: "Horodatage" },
    { key: "vehicle", title: "Véhicule" },
  ];

  const handleCreate = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleEdit = (row: TrackingType) => {
    setEditing(row);
    setOpen(true);
  };

  const handleDelete = (row: TrackingType) => {
    setToDelete(row);
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    try {
      await deleteTracking(toDelete.id).unwrap();
      refetch();
    } catch (err) {
      console.error("delete tracking error", err);
    }
    setToDelete(null);
  };

  const upsert = async (values: Partial<TrackingType> & { id?: string }) => {
    try {
      if (values.id) {
        await updateTracking({ slug: values.id, data: values }).unwrap();
      } else {
        await createTracking(values as any).unwrap();
      }
      refetch();
    } catch (err) {
      console.error("upsert tracking error", err);
    }
  };

  const rows: TrackingType[] =
    (points || []).map((p: any) => ({
      id: p.slug ?? p._id,
      location: p.location ?? (p.lat && p.lon ? `${p.lat}, ${p.lon}` : ""),
      timestamp: p.timestamp,
      vehicle: p.vehicle,
    })) ?? [];

  return (
    <Page
      header={
        <>
          <div>
            <h1 className="text-xl font-semibold">Suivi</h1>
            <p className="text-sm text-slate-500">
              Points de suivi des véhicules.
            </p>
          </div>
          <Button onClick={handleCreate}>Ajouter point</Button>
        </>
      }
    >
      <div className="space-y-4">
        {isLoading && <div>Chargement...</div>}

        <Table
          columns={columns}
          data={rows}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <TrackingForm
          open={open}
          onClose={() => setOpen(false)}
          title={editing ? "Modifier un point" : "Ajouter un point"}
          initialValues={editing ?? undefined}
          onSubmit={async (values) => {
            await upsert(values);
            setOpen(false);
          }}
        />

        <DeleteConfirm
          open={!!toDelete}
          onClose={() => setToDelete(null)}
          onConfirm={confirmDelete}
        />
      </div>
    </Page>
  );
};

export default Tracking;
