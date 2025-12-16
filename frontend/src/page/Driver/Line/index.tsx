import { useState } from "react";
import Page from "../../../components/layout/Page";
import type { Column } from "../../../components/ui/Table";
import Table from "../../../components/ui/Table";
import { useGetLinesQuery } from "../../../services/line.service";
import LineDetailModal from "./LineDetailModal";

type LineType = {
  id: string;
  departLocation?: string;
  arriveLocation?: string;
  status?: string;
  truck?: {
    registration?: string;
    brand?: string;
    model?: string;
  };
  trailer?: {
    registration?: string;
    brand?: string;
    model?: string;
  };
  driver?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
};

type ApiLineType = {
  slug?: string;
  _id?: string;
  departLocation?: string;
  arriveLocation?: string;
  status?: string;
  truck?: {
    registration?: string;
    brand?: string;
    model?: string;
  };
  trailer?: {
    registration?: string;
    brand?: string;
    model?: string;
  };
  driver?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
};

const DriverLine = () => {
  const [selectedLine, setSelectedLine] = useState<LineType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: lines, isLoading } = useGetLinesQuery();

  const columns: Column<LineType>[] = [
    { key: "departLocation", title: "Départ" },
    { key: "arriveLocation", title: "Arrivée" },
    { key: "status", title: "Statut" },
  ];

  const handleViewDetails = (row: LineType) => {
    setSelectedLine(row);
    setIsModalOpen(true);
  };

  const rows: LineType[] =
    (lines || []).map((l: ApiLineType) => ({
      id: l.slug ?? l._id ?? "",
      departLocation: l.departLocation,
      arriveLocation: l.arriveLocation,
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

        <Table
          columns={columns}
          data={rows}
          onEdit={handleViewDetails}
          editButtonText="Voir détail"
        />

        <LineDetailModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          line={selectedLine}
        />
      </div>
    </Page>
  );
};

export default DriverLine;
