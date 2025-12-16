import { useState } from "react";
import Page from "../../../components/layout/Page";
import type { Column } from "../../../components/ui/Table";
import Table from "../../../components/ui/Table";
import { useGetLinesQuery } from "../../../services/line.service";
import LineDetailModal from "./LineDetailModal";

type LineType = {
  id: string;
  departure?: string;
  arrival?: string;
  status?: string;
  truck?: string;
  trailer?: string;
  driver?: string;
};

type ApiLineType = {
  slug?: string;
  _id?: string;
  departure?: string;
  arrival?: string;
  status?: string;
  truck?: string;
  trailer?: string;
  driver?: string;
};

const Line = () => {
  const [selectedLine, setSelectedLine] = useState<LineType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: lines, isLoading } = useGetLinesQuery();

  const columns: Column<LineType>[] = [
    { key: "departure", title: "Départ" },
    { key: "arrival", title: "Arrivée" },
    { key: "status", title: "Statut" },
  ];

  const handleViewDetails = (row: LineType) => {
    setSelectedLine(row);
    setIsModalOpen(true);
  };

  const rows: LineType[] =
    (lines || []).map((l: ApiLineType) => ({
      id: l.slug ?? l._id ?? "",
      departure: l.departure,
      arrival: l.arrival,
      status: l.status,
      truck: l.truck,
      trailer: l.trailer,
      driver: l.driver,
    })) ?? [];

  return (
    <Page
      header={
        <>
          <div>
            <h1 className="text-xl font-semibold">Mes lignes</h1>
            <p className="text-sm text-slate-500">
              Liste des trajets qui vous sont assignés.
            </p>
          </div>
        </>
      }
    >
      <div className="space-y-4">
        {isLoading && <div>Chargement...</div>}

        <Table columns={columns} data={rows} onEdit={handleViewDetails} />

        <LineDetailModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          line={selectedLine}
        />
      </div>
    </Page>
  );
};

export default Line;
