import Modal from "../../../components/ui/Modal";

type LineType = {
  id: string;
  departure?: string;
  arrival?: string;
  status?: string;
  truck?: string;
  trailer?: string;
  driver?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  line: LineType | null;
};

const LineDetailModal = ({ open, onClose, line }: Props) => {
  if (!line) return null;

  return (
    <Modal open={open} onClose={onClose} title="Détails de la ligne">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-slate-600">Départ</h3>
            <p className="text-slate-800">{line.departure || "N/A"}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-600">Arrivée</h3>
            <p className="text-slate-800">{line.arrival || "N/A"}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-600">Statut</h3>
            <p className="text-slate-800">{line.status || "N/A"}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-600">Camion</h3>
            <p className="text-slate-800">{line.truck || "N/A"}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-600">Remorque</h3>
            <p className="text-slate-800">{line.trailer || "N/A"}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-600">Chauffeur</h3>
            <p className="text-slate-800">{line.driver || "N/A"}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            className="rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            onClick={onClose}
          >
            Fermer
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LineDetailModal;
