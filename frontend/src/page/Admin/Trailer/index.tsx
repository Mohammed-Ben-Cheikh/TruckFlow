import { useState } from "react";
import Page from "../../../components/layout/Page";
import Button from "../../../components/ui/Button";
import DeleteConfirm from "../../../components/ui/DeleteConfirm";
import type { Column } from "../../../components/ui/Table";
import Table from "../../../components/ui/Table";
import TrailerForm from "./TrailerForm";

type TrailerType = {
  id: string;
  registration: string;
  brand?: string;
  type?: string;
  status?: string;
};

const initialData: TrailerType[] = [
  {
    id: "t1",
    registration: "321-XZ-98",
    brand: "Krone",
    type: "Reefer",
    status: "available",
  },
  {
    id: "t2",
    registration: "654-YQ-22",
    brand: "Schmitz",
    type: "Flatbed",
    status: "on_trip",
  },
];

const Trailer = () => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<TrailerType[]>(initialData);
  const [toDelete, setToDelete] = useState<TrailerType | null>(null);

  const columns: Column<TrailerType>[] = [
    { key: "registration", title: "Immatriculation" },
    { key: "brand", title: "Marque" },
    { key: "type", title: "Type" },
    { key: "status", title: "Statut" },
  ];

  return (
    <Page
      header={
        <>
          <div>
            <h1 className="text-xl font-semibold">Remorques</h1>
            <p className="text-sm text-slate-500">Liste des remorques.</p>
          </div>
          <Button onClick={() => setOpen(true)}>Nouvelle remorque</Button>
        </>
      }
    >
      <div className="space-y-4">
        <Table columns={columns} data={rows} onDelete={(r) => setToDelete(r)} />

        <TrailerForm
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={(values) =>
            setRows((s) => [
              { id: String(Date.now()), ...(values as any) },
              ...s,
            ])
          }
        />

        <DeleteConfirm
          open={!!toDelete}
          onClose={() => setToDelete(null)}
          onConfirm={() => {
            if (!toDelete) return;
            setRows((r) => r.filter((x) => x.id !== toDelete.id));
            setToDelete(null);
          }}
        />
      </div>
    </Page>
  );
};

export default Trailer;
