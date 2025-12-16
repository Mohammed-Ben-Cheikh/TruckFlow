import { useState } from "react";
import { FormModal } from "../../../components";

type Props = {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  initialValues?: any;
  onSubmit?: (values: any) => void;
};

const TrackingForm = ({
  open,
  onClose,
  title,
  initialValues,
  onSubmit,
}: Props) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <FormModal
      open={open ?? openModal}
      onClose={() => (onClose ? onClose() : setOpenModal(false))}
      title={title ?? "Ajouter un point de suivi"}
      description="Formulaire simple pour ajouter un point de suivi."
      fields={[
        {
          name: "vehicleId",
          label: "Véhicule (ID)",
          placeholder: "ObjectId du véhicule",
          required: true,
        },
        { name: "lat", label: "Latitude", placeholder: "Ex: 48.8566" },
        { name: "lon", label: "Longitude", placeholder: "Ex: 2.3522" },
        {
          name: "timestamp",
          label: "Horodatage",
          type: "text",
          placeholder: "2025-12-14T12:00:00Z",
        },
        { name: "notes", label: "Notes", type: "textarea" },
      ]}
      initialValues={initialValues ?? {}}
      onSubmit={(values) => {
        onSubmit?.(values);
        setOpenModal(false);
        onClose?.();
      }}
    />
  );
};

export default TrackingForm;
