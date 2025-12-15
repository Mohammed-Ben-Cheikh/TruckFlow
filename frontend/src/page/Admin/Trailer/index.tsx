import { useState } from "react";
import Page from "../../../components/layout/Page";
import Button from "../../../components/ui/Button";
import DeleteConfirm from "../../../components/ui/DeleteConfirm";
import type { Column } from "../../../components/ui/Table";
import Table from "../../../components/ui/Table";
import {
  useCreateTrailerMutation,
  useDeleteTrailerMutation,
  useGetTrailersQuery,
  useUpdateTrailerMutation,
} from "../../../services/trailer.service";
import TrailerForm from "./TrailerForm";

type TrailerType = {
  id: string;
  registration: string;
  brand?: string;
  type?: string;
  status?: string;
};

const Trailer = () => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<TrailerType | null>(null);
  const [toDelete, setToDelete] = useState<TrailerType | null>(null);

  const { data: trailers, isLoading, refetch } = useGetTrailersQuery();
  const [createTrailer] = useCreateTrailerMutation();
  const [updateTrailer] = useUpdateTrailerMutation();
  const [deleteTrailer] = useDeleteTrailerMutation();

  const columns: Column<TrailerType>[] = [
    { key: "registration", title: "Immatriculation" },
    { key: "brand", title: "Marque" },
    { key: "type", title: "Type" },
    { key: "status", title: "Statut" },
  ];

  const handleCreate = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleEdit = (row: TrailerType) => {
    setEditing(row);
    setOpen(true);
  };

  const handleDelete = (row: TrailerType) => {
    setToDelete(row);
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    try {
      await deleteTrailer(toDelete.id).unwrap();
      refetch();
    } catch (err) {
      console.error("delete trailer error", err);
    }
    setToDelete(null);
  };

  const upsert = async (values: Partial<TrailerType> & { id?: string }) => {
    try {
      if (values.id) {
        await updateTrailer({ slug: values.id, data: values }).unwrap();
      } else {
        await createTrailer(values as any).unwrap();
      }
      refetch();
    } catch (err) {
      console.error("upsert trailer error", err);
    }
  };

  const rows: TrailerType[] =
    (trailers || []).map((t: any) => ({
      id: t.slug ?? t._id,
      registration: t.registration,
      brand: t.brand,
      type: t.type,
      status: t.status,
    })) ?? [];

  return (
    <Page
      header={
        <>
          <div>
            <h1 className="text-xl font-semibold">Remorques</h1>
            <p className="text-sm text-slate-500">Liste des remorques.</p>
          </div>
          <Button onClick={handleCreate}>Nouvelle remorque</Button>
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

        <TrailerForm
          open={open}
          onClose={() => setOpen(false)}
          title={editing ? "Modifier une remorque" : "Créer une remorque"}
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

export default Trailer;
