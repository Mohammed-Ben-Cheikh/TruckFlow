import { useState } from "react";
import Page from "../../../components/layout/Page";
import Button from "../../../components/ui/Button";
import DeleteConfirm from "../../../components/ui/DeleteConfirm";
import type { Column } from "../../../components/ui/Table";
import Table from "../../../components/ui/Table";
import TruckForm from "./TruckForm";

type TruckType = {
  id: string;
  name: string;
  license: string;
  brand?: string;
  model?: string;
  status?: string;
};

const initialData: TruckType[] = [
  {
    id: "1",
    name: "Volvo FH16",
    license: "123-AB-45",
    brand: "Volvo",
    model: "FH16",
    status: "available",
  },
  {
    id: "2",
    name: "Scania R500",
    license: "987-CD-21",
    brand: "Scania",
    model: "R500",
    status: "maintenance",
  },
];

const Truck = () => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<TruckType[]>(initialData);
  const [editing, setEditing] = useState<TruckType | null>(null);
  const [toDelete, setToDelete] = useState<TruckType | null>(null);

  const columns: Column<TruckType>[] = [
    { key: "name", title: "Nom" },
    { key: "license", title: "Immatriculation" },
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

  const confirmDelete = () => {
    if (!toDelete) return;
    setRows((prev) => prev.filter((r) => r.id !== toDelete.id));
    setToDelete(null);
  };

  const upsert = (values: Partial<TruckType> & { id?: string }) => {
    if (values.id) {
      setRows((prev) =>
        prev.map((r) =>
          r.id === values.id ? { ...r, ...(values as Partial<TruckType>) } : r
        )
      );
    } else {
      const id = String(Date.now());
      setRows((prev) => [
        { id, ...(values as Partial<TruckType>) } as TruckType,
        ...prev,
      ]);
    }
  };

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
          onSubmit={(values) => {
            upsert(values);
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
