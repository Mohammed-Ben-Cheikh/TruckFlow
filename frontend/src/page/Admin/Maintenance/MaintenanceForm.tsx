import { useState } from "react";
import { FormModal } from "../../../components";

type Props = { open?: boolean; onClose?: () => void };

const MaintenanceForm = ({ open, onClose }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [description, setDescription] = useState("");

  return (
    <FormModal
      open={open ?? openModal}
      onClose={() => (onClose ? onClose() : setOpenModal(false))}
      title="Créer une maintenance"
      description="Formulaire pour planifier une maintenance."
      fields={[
        {
          name: "vehicleType",
          label: "Type véhicule",
          type: "select",
          options: [
            { value: "truck", label: "Truck" },
            { value: "trailer", label: "Trailer" },
          ],
          required: true,
        },
        {
          name: "vehicle",
          label: "Véhicule (ID)",
          placeholder: "ObjectId du véhicule",
          required: true,
        },
        {
          name: "type",
          label: "Type de maintenance",
          type: "select",
          options: [
            { value: "oil_change", label: "Oil change" },
            { value: "revision", label: "Revision" },
            { value: "tires_change", label: "Tires change" },
            { value: "general_check", label: "General check" },
            { value: "repair", label: "Repair" },
          ],
          required: true,
        },
        {
          name: "status",
          label: "Statut",
          type: "select",
          options: [
            { value: "planned", label: "Planned" },
            { value: "in_progress", label: "In progress" },
            { value: "done", label: "Done" },
            { value: "canceled", label: "Canceled" },
          ],
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          placeholder: "Détails",
        },
        { name: "plannedAtKm", label: "Planifié à (km)", type: "number" },
        { name: "cost", label: "Coût", type: "number" },
      ]}
      initialValues={{ description }}
      onSubmit={(values) => {
        console.log("submit maintenance", values);
        setDescription((values.description as string) ?? "");
        setOpenModal(false);
      }}
    />
  );
};

export default MaintenanceForm;
