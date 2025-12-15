import { useState } from "react";
import { FormModal } from "../../../components";

type Props = {
  open?: boolean;
  onClose?: () => void;
};

const LineForm = ({ open, onClose }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [code, setCode] = useState("");
  const [departLocation, setDepartLocation] = useState("");
  const [arriveLocation, setArriveLocation] = useState("");

  return (
    <FormModal
      open={open ?? openModal}
      onClose={() => (onClose ? onClose() : setOpenModal(false))}
      title="Créer une ligne"
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
      initialValues={{ code, departLocation, arriveLocation }}
      onSubmit={(values) => {
        console.log("submit line", values);
        setCode((values.code as string) ?? "");
        setDepartLocation((values.departLocation as string) ?? "");
        setArriveLocation((values.arriveLocation as string) ?? "");
        setOpenModal(false);
      }}
    />
  );
};

export default LineForm;
