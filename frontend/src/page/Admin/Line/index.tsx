import { useState } from "react";
import Page from "../../../components/layout/Page";
import Button from "../../../components/ui/Button";
import DeleteConfirm from "../../../components/ui/DeleteConfirm";
import type { Column } from "../../../components/ui/Table";
import Table from "../../../components/ui/Table";
import {
  useCreateLineMutation,
  useDeleteLineMutation,
  useGetLinesQuery,
  useUpdateLineMutation,
} from "../../../services/line.service";
import LineForm from "./LineFormEnhanced";

type LineType = {
  id: string;
  departLocation?: string;
  arriveLocation?: string;
  status?: string;
};

const Line = () => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<LineType | null>(null);
  const [toDelete, setToDelete] = useState<LineType | null>(null);

  const { data: lines, isLoading, refetch } = useGetLinesQuery();
  const [createLine] = useCreateLineMutation();
  const [updateLine] = useUpdateLineMutation();
  const [deleteLine] = useDeleteLineMutation();

  const columns: Column<LineType>[] = [
    { key: "departLocation", title: "Départ" },
    { key: "arriveLocation", title: "Arrivée" },
    { key: "status", title: "Statut" },
  ];

  const handleCreate = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleEdit = (row: LineType) => {
    setEditing(row);
    setOpen(true);
  };

  const handleDelete = (row: LineType) => {
    setToDelete(row);
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    try {
      await deleteLine(toDelete.id).unwrap();
      refetch();
    } catch (err) {
      console.error("delete line error", err);
    }
    setToDelete(null);
  };

  const upsert = async (values: Partial<LineType> & { id?: string }) => {
    try {
      if (values.id) {
        await updateLine({ slug: values.id, data: values }).unwrap();
      } else {
        await createLine(values as any).unwrap();
      }
      refetch();
    } catch (err) {
      console.error("upsert line error", err);
    }
  };

  const rows: LineType[] =
    (lines || []).map((l: any) => ({
      id: l.slug ?? l._id,
      departLocation: l.departLocation,
      arriveLocation: l.arriveLocation,
      status: l.status,
    })) ?? [];

  return (
    <Page
      header={
        <>
          <div>
            <h1 className="text-xl font-semibold">Lignes</h1>
            <p className="text-sm text-slate-500">Liste des trajets.</p>
          </div>
          <Button onClick={handleCreate}>Nouvelle ligne</Button>
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

        <LineForm
          open={open}
          onClose={() => setOpen(false)}
          title={editing ? "Modifier une ligne" : "Créer une ligne"}
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

export default Line;
