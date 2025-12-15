import { useState } from "react";
import { FormModal } from "../../../components";

type Props = { open?: boolean; onClose?: () => void };

const TireForm = ({ open, onClose }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [reference, setReference] = useState("");
  const [brand, setBrand] = useState("");

  return (
    <FormModal
      open={open ?? openModal}
      onClose={() => (onClose ? onClose() : setOpenModal(false))}
      title="Créer un pneu"
      description="Formulaire pour ajouter un pneu."
      fields={[
        {
          name: "reference",
          label: "Référence",
          placeholder: "Référence du pneu",
          required: true,
        },
        { name: "brand", label: "Marque", placeholder: "Marque" },
        {
          name: "diameter",
          label: "Diamètre",
          placeholder: "Ex: 20",
          type: "number",
        },
        {
          name: "kilometrageMax",
          label: "Kilométrage max",
          placeholder: "Ex: 100000",
          type: "number",
        },
        {
          name: "status",
          label: "Statut",
          type: "select",
          options: [
            { value: "good", label: "Good" },
            { value: "warning", label: "Warning" },
            { value: "critical", label: "Critical" },
          ],
        },
      ]}
      initialValues={{ reference, brand }}
      onSubmit={(values) => {
        console.log("submit tire", values);
        setReference((values.reference as string) ?? "");
        setBrand((values.brand as string) ?? "");
        setOpenModal(false);
      }}
    />
  );
};

export default TireForm;
