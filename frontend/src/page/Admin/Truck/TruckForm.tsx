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
  return (
    <FormModal
      open={open ?? openModal}
      onClose={() => (onClose ? onClose() : setOpenModal(false))}
      title={title}
      description="Formulaire court pour illustrer l'utilisation des inputs."
      fields={[
        {
          name: "registration",
          label: "Immatriculation",
          placeholder: "Ex: 123-AB-45",
          required: true,
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
      initialValues={
        initialValues ?? { registration: "", brand: "", model: "" }
      }
      onSubmit={(values) => {
        // pass to parent handler which will call API
        onSubmit?.(values);
        setOpenModal(false);
        onClose?.();
      }}
    />
  );
};

export default TruckForm;
