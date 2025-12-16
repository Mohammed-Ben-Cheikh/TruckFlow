import { useState } from "react";
import { FormModal } from "../../../components";

type Props = {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  initialValues?: any;
  onSubmit?: (values: any) => void;
};

const TireForm = ({ open, onClose, title, initialValues, onSubmit }: Props) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <FormModal
      open={open ?? openModal}
      onClose={() => (onClose ? onClose() : setOpenModal(false))}
      title={title ?? "Créer un pneu"}
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
      initialValues={initialValues ?? {}}
      onSubmit={(values) => {
        onSubmit?.(values);
        setOpenModal(false);
        onClose?.();
      }}
    />
  );
};

export default TireForm;
