import { useState } from "react";
import { FormModal } from "../../../components";

type Props = { open?: boolean; onClose?: () => void };

const TrackingForm = ({ open, onClose }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [vehicleId, setVehicleId] = useState("");

  return (
    <FormModal
      open={open ?? openModal}
      onClose={() => (onClose ? onClose() : setOpenModal(false))}
      title="Ajouter un point de suivi"
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
      initialValues={{ vehicleId }}
      onSubmit={(values) => {
        console.log("submit tracking", values);
        setVehicleId((values.vehicleId as string) ?? "");
        setOpenModal(false);
      }}
    />
  );
};

export default TrackingForm;
