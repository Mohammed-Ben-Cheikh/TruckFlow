import { useState } from "react";
import { FormModal } from "../../../components";

type Props = {
  open?: boolean;
  onClose?: () => void;
  initialValues?: Record<string, any>;
  title?: string;
  onSubmit?: (values: any) => void;
};

const TruckForm = ({
  open,
  onClose,
  initialValues,
  title = "Créer un camion",
  onSubmit,
}: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [truckName, setTruckName] = useState("");
  const [license, setLicense] = useState("");
  return (
    <FormModal
      open={open ?? openModal}
      onClose={() => (onClose ? onClose() : setOpenModal(false))}
      title={title}
      description="Formulaire court pour illustrer l'utilisation des inputs."
      fields={[
        {
          name: "name",
          label: "Nom du camion",
          placeholder: "Ex: Volvo FH16",
          required: true,
        },
        {
          name: "license",
          label: "Immatriculation",
          placeholder: "Ex: 123-AB-45",
          required: true,
          hint: "Conservez le format utilisé dans le backend.",
        },
        {
          name: "notes",
          label: "Notes",
          type: "textarea",
          placeholder: "Remarques...",
        },
        {
          name: "brand",
          label: "Marque",
          placeholder: "Ex: Volvo",
        },
        {
          name: "model",
          label: "Modèle",
          placeholder: "Ex: FH16",
        },
        {
          name: "status",
          label: "Statut",
          type: "select",
          options: [
            { value: "available", label: "Available" },
            { value: "on_trip", label: "On trip" },
            { value: "maintenance", label: "Maintenance" },
          ],
        },
      ]}
      initialValues={initialValues ?? { name: truckName, license }}
      onSubmit={(values) => {
        // Exemple: ici vous pouvez appeler votre API
        console.log("submit values", values);
        setTruckName((values.name as string) ?? "");
        setLicense((values.license as string) ?? "");
        setOpenModal(false);
        onSubmit?.(values);
      }}
    />
  );
};

export default TruckForm;
