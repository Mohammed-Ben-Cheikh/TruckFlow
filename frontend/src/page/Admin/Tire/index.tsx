import { useState } from "react";
import Page from "../../../components/layout/Page";
import Button from "../../../components/ui/Button";
import DeleteConfirm from "../../../components/ui/DeleteConfirm";
import type { Column } from "../../../components/ui/Table";
import Table from "../../../components/ui/Table";
import {
  useCreateTireMutation,
  useDeleteTireMutation,
  useGetTiresQuery,
  useUpdateTireMutation,
} from "../../../services/tire.service";
import TireForm from "./TireForm";

type TireType = {
  id: string;
  reference?: string;
  brand?: string;
  diameter?: number;
  used?: boolean;
};

const Tire = () => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<TireType | null>(null);
  const [toDelete, setToDelete] = useState<TireType | null>(null);

  const { data: tires, isLoading, refetch } = useGetTiresQuery();
  const [createTire] = useCreateTireMutation();
  const [updateTire] = useUpdateTireMutation();
  const [deleteTire] = useDeleteTireMutation();

  const columns: Column<TireType>[] = [
    { key: "reference", title: "Référence" },
    { key: "brand", title: "Marque" },
    { key: "diameter", title: "Diamètre" },
    { key: "used", title: "Utilisé" },
  ];

  const handleCreate = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleEdit = (row: TireType) => {
    setEditing(row);
    setOpen(true);
  };

  const handleDelete = (row: TireType) => {
    setToDelete(row);
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    try {
      await deleteTire(toDelete.id).unwrap();
      refetch();
    } catch (err) {
      console.error("delete tire error", err);
    }
    setToDelete(null);
  };

  const upsert = async (values: Partial<TireType> & { id?: string }) => {
    try {
      if (values.id) {
        await updateTire({ slug: values.id, data: values }).unwrap();
      } else {
        await createTire(values as any).unwrap();
      }
      refetch();
    } catch (err) {
      console.error("upsert tire error", err);
    }
  };

  const rows: TireType[] =
    (tires || []).map((t: any) => ({
      id: t.slug ?? t._id,
      reference: t.reference,
      brand: t.brand,
      diameter: t.diameter,
      used: t.used,
    })) ?? [];

  return (
    <Page
      header={
        <>
          <div>
            <h1 className="text-xl font-semibold">Pneus</h1>
            <p className="text-sm text-slate-500">Liste des pneus.</p>
          </div>
          <Button onClick={handleCreate}>Nouveau pneu</Button>
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

        <TireForm
          open={open}
          onClose={() => setOpen(false)}
          title={editing ? "Modifier un pneu" : "Créer un pneu"}
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

export default Tire;
