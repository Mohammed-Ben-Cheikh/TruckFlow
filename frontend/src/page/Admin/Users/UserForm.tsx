import { useState } from "react";
import { FormModal } from "../../../components";

type Props = {
  open?: boolean;
  onClose?: () => void;
  initialValues?: Record<string, any>;
  title?: string;
  onSubmit?: (values: any) => void;
};

const UserForm = ({
  open,
  onClose,
  initialValues,
  title = "Créer un utilisateur",
  onSubmit,
}: Props) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <FormModal
      open={open ?? openModal}
      onClose={() => (onClose ? onClose() : setOpenModal(false))}
      title={title}
      description="Formulaire pour ajouter un nouvel utilisateur."
      fields={[
        {
          name: "email",
          label: "Email",
          placeholder: "Ex: employe@entreprise.com",
          required: true,
          type: "email",
        },
        {
          name: "password",
          label: "Mot de passe",
          type: "password",
          required: true,
        },
        {
          name: "confirmPassword",
          label: "Confirmer le mot de passe",
          type: "password",
          required: true,
        },
        {
          name: "firstName",
          label: "Prénom",
          placeholder: "Ex: Jean",
          required: true,
        },
        {
          name: "lastName",
          label: "Nom",
          placeholder: "Ex: Dupont",
          required: true,
        },
      ]}
      initialValues={
        initialValues ?? {
          email: "",
          password: "",
          confirmPassword: "",
          firstName: "",
          lastName: "",
        }
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

export default UserForm;
