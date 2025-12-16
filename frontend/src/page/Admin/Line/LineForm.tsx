import { useState } from "react";
import { FormModal } from "../../../components";
import { useCreateLineMutation } from "../../../services/line.service";

type Props = {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  initialValues?: any;
  onSubmit?: (values: any) => Promise<void>;
};

const LineForm = ({ open, onClose, title, initialValues, onSubmit }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [createLine] = useCreateLineMutation();

  return (
    <FormModal
      open={open ?? openModal}
      onClose={() => (onClose ? onClose() : setOpenModal(false))}
      title={title ?? "Créer une ligne"}
      description="Formulaire pour créer une ligne (route)."
      fields={[
        {
          name: "code",
          label: "Code",
          placeholder: "Code de la ligne",
          required: true,
        },
        {
          name: "truck",
          label: "Camion (ID)",
          placeholder: "ObjectId du camion",
        },
        {
          name: "trailer",
          label: "Remorque (ID)",
          placeholder: "ObjectId de la remorque",
        },
        {
          name: "driver",
          label: "Chauffeur (ID)",
          placeholder: "ObjectId du chauffeur",
        },
        {
          name: "departLocation",
          label: "Départ",
          placeholder: "Ville de départ",
        },
        {
          name: "arriveLocation",
          label: "Arrivée",
          placeholder: "Ville d'arrivée",
        },
        {
          name: "status",
          label: "Statut",
          type: "select",
          options: [
            { value: "a_faire", label: "A faire" },
            { value: "en_cours", label: "En cours" },
            { value: "termine", label: "Terminé" },
          ],
        },
      ]}
      initialValues={initialValues ?? {}}
      onSubmit={
        onSubmit ??
        (async (values) => {
          try {
            await createLine(values as any).unwrap();
          } catch (err) {
            // handle error (toast/modal) if needed
            console.error("create line error", err);
          }
          setOpenModal(false);
          onClose?.();
        })
      }
    />
  );
};

export default LineForm;
