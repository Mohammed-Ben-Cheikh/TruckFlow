import { useState } from "react";
import { FormModal } from "../../../components";

type Props = {
  open?: boolean;
  onClose?: () => void;
  initialValues?: Record<string, any>;
  title?: string;
  onSubmit?: (values: any) => void;
};

const TrailerForm = ({
  open,
  onClose,
  initialValues,
  title = "Créer une remorque",
  onSubmit,
}: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [registration, setRegistration] = useState("");

  return (
    <FormModal
      open={open ?? openModal}
      onClose={() => (onClose ? onClose() : setOpenModal(false))}
      title={title}
      description="Formulaire pour ajouter une remorque."
      fields={[
        {
          name: "registration",
          label: "Immatriculation",
          placeholder: "Ex: 123-AB-45",
          required: true,
        },
        { name: "brand", label: "Marque", placeholder: "Marque" },
        { name: "type", label: "Type", placeholder: "Type de remorque" },
        {
          name: "status",
          label: "Statut",
          placeholder: "available/on_trip/maintenance",
          type: "select",
          options: [
            { value: "available", label: "Available" },
            { value: "on_trip", label: "On trip" },
            { value: "maintenance", label: "Maintenance" },
          ],
        },
      ]}
      initialValues={initialValues ?? { registration }}
      onSubmit={(values) => {
        console.log("submit trailer", values);
        setRegistration((values.registration as string) ?? "");
        setOpenModal(false);
        onSubmit?.(values);
      }}
    />
  );
};

export default TrailerForm;
