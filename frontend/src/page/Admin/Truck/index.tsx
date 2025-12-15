import { useState } from "react";
import Page from "../../../components/layout/Page";
import Button from "../../../components/ui/Button";
import DeleteConfirm from "../../../components/ui/DeleteConfirm";
import type { Column } from "../../../components/ui/Table";
import Table from "../../../components/ui/Table";
import {
  useCreateTruckMutation,
  useDeleteTruckMutation,
  useGetTrucksQuery,
  useUpdateTruckMutation,
} from "../../../services/truck.service";
import TruckForm from "./TruckForm";

type TruckType = {
  id: string;
  registration: string;
  brand?: string;
  model?: string;
  status?: string;
};

const Truck = () => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<TruckType | null>(null);
  const [toDelete, setToDelete] = useState<TruckType | null>(null);

  const { data: trucks, isLoading, refetch } = useGetTrucksQuery();
  const [createTruck] = useCreateTruckMutation();
  const [updateTruck] = useUpdateTruckMutation();
  const [deleteTruck] = useDeleteTruckMutation();

  const columns: Column<TruckType>[] = [
    { key: "registration", title: "Immatriculation" },
    { key: "brand", title: "Marque" },
    { key: "model", title: "Modèle" },
    { key: "status", title: "Statut" },
  ];

  const handleCreate = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleEdit = (row: TruckType) => {
    setEditing(row);
    setOpen(true);
  };

  const handleDelete = (row: TruckType) => {
    setToDelete(row);
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    try {
      await deleteTruck(toDelete.id).unwrap();
      refetch();
    } catch (err) {
      console.error("delete truck error", err);
    }
    setToDelete(null);
  };

  const upsert = async (values: Partial<TruckType> & { id?: string }) => {
    try {
      if (values.id) {
        await updateTruck({ slug: values.id, data: values }).unwrap();
      } else {
        await createTruck(values).unwrap();
      }
      refetch();
    } catch (err) {
      console.error("upsert truck error", err);
    }
  };

  const rows: TruckType[] =
    (trucks || []).map((t: any) => ({
      id: t.slug ?? t._id,
      registration: t.registration,
      brand: t.brand,
      model: t.model,
      status: t.status,
    })) ?? [];

  return (
    <Page
      header={
        <>
          <div>
            <h1 className="text-xl font-semibold">Camions</h1>
            <p className="text-sm text-slate-500">Liste des camions.</p>
          </div>
          <Button onClick={handleCreate}>Nouveau camion</Button>
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

        <TruckForm
          open={open}
          onClose={() => setOpen(false)}
          title={editing ? "Modifier un camion" : "Créer un camion"}
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

export default Truck;
