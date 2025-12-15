import { useState } from "react";
import Page from "../../../components/layout/Page";
import Button from "../../../components/ui/Button";
import DeleteConfirm from "../../../components/ui/DeleteConfirm";
import type { Column } from "../../../components/ui/Table";
import Table from "../../../components/ui/Table";
import {
  useCreateMaintenanceMutation,
  useDeleteMaintenanceMutation,
  useGetMaintenancesQuery,
  useUpdateMaintenanceMutation,
} from "../../../services/maintenance.service";
import MaintenanceForm from "./MaintenanceForm";

type MaintenanceType = {
  id: string;
  type?: string;
  vehicle?: string;
  date?: string;
};

const Maintenance = () => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<MaintenanceType | null>(null);
  const [toDelete, setToDelete] = useState<MaintenanceType | null>(null);

  const { data: maints, isLoading, refetch } = useGetMaintenancesQuery();
  const [createMaintenance] = useCreateMaintenanceMutation();
  const [updateMaintenance] = useUpdateMaintenanceMutation();
  const [deleteMaintenance] = useDeleteMaintenanceMutation();

  const columns: Column<MaintenanceType>[] = [
    { key: "type", title: "Type" },
    { key: "vehicle", title: "Véhicule" },
    { key: "date", title: "Date" },
  ];

  const handleCreate = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleEdit = (row: MaintenanceType) => {
    setEditing(row);
    setOpen(true);
  };

  const handleDelete = (row: MaintenanceType) => {
    setToDelete(row);
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    try {
      await deleteMaintenance(toDelete.id).unwrap();
      refetch();
    } catch (err) {
      console.error("delete maintenance error", err);
    }
    setToDelete(null);
  };

  const upsert = async (values: Partial<MaintenanceType> & { id?: string }) => {
    try {
      if (values.id) {
        await updateMaintenance({ slug: values.id, data: values }).unwrap();
      } else {
        await createMaintenance(values as any).unwrap();
      }
      refetch();
    } catch (err) {
      console.error("upsert maintenance error", err);
    }
  };

  const rows: MaintenanceType[] =
    (maints || []).map((m: any) => ({
      id: m.slug ?? m._id,
      type: m.type,
      vehicle: m.vehicle,
      date: m.date ?? m.createdAt,
    })) ?? [];

  return (
    <Page
      header={
        <>
          <div>
            <h1 className="text-xl font-semibold">Maintenances</h1>
            <p className="text-sm text-slate-500">Liste des maintenances.</p>
          </div>
          <Button onClick={handleCreate}>Nouvelle maintenance</Button>
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

        <MaintenanceForm
          open={open}
          onClose={() => setOpen(false)}
          title={editing ? "Modifier une maintenance" : "Créer une maintenance"}
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

export default Maintenance;
