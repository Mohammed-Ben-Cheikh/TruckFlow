import Button from "./Button";
import Modal from "./Modal";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
};

const DeleteConfirm = ({
  open,
  onClose,
  onConfirm,
  title = "Confirmer la suppression",
  description = "Êtes-vous sûr de vouloir supprimer cet élément ?",
}: Props) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      hideFooter
    >
      <div className="flex items-center justify-end gap-3">
        <Button variant="ghost" onClick={onClose}>
          Annuler
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          Supprimer
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteConfirm;
