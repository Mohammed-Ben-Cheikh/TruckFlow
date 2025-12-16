import { useState } from "react";
import Page from "../../../components/layout/Page";
import Button from "../../../components/ui/Button";
import DeleteConfirm from "../../../components/ui/DeleteConfirm";
import type { Column } from "../../../components/ui/Table";
import Table from "../../../components/ui/Table";
import {
  useRegisterMutation,
  useGetEmployeesQuery,
} from "../../../services/auth.service";
import UserForm from "./UserForm";

type UserType = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  username?: string;
};

const Users = () => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<UserType | null>(null);
  const [toDelete, setToDelete] = useState<UserType | null>(null);

  const [register] = useRegisterMutation();
  const { data: employeesData, isLoading, refetch } = useGetEmployeesQuery();

  const columns: Column<UserType>[] = [
    { key: "email", title: "Email" },
    { key: "firstName", title: "Prénom" },
    { key: "lastName", title: "Nom" },
    { key: "username", title: "Nom d'utilisateur" },
  ];

  const handleCreate = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleEdit = (row: UserType) => {
    setEditing(row);
    setOpen(true);
  };

  const handleDelete = (row: UserType) => {
    setToDelete(row);
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    try {
      // TODO: Implement delete user API call
      console.log("Delete user:", toDelete.id);
    } catch (err) {
      console.error("delete user error", err);
    }
    setToDelete(null);
  };

  const upsert = async (values: UserFormType & { id?: string }) => {
    try {
      if (values.id) {
        // TODO: Implement update user API call
        console.log("Update user:", values.id, values);
      } else {
        await register({
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
          firstName: values.firstName,
          lastName: values.lastName,
        }).unwrap();
      }
      refetch();
    } catch (err) {
      console.error("upsert user error", err);
    }
  };

  const rows: UserType[] =
    (employeesData?.employees || []).map(
      (emp: {
        _id: string;
        email: string;
        firstName?: string;
        lastName?: string;
        username?: string;
      }) => ({
        id: emp._id,
        email: emp.email,
        firstName: emp.firstName,
        lastName: emp.lastName,
        username: emp.username,
      })
    ) ?? [];

  return (
    <Page
      header={
        <>
          <div>
            <h1 className="text-xl font-semibold">Utilisateurs</h1>
            <p className="text-sm text-slate-500">Gestion des utilisateurs.</p>
          </div>
          <Button onClick={handleCreate}>Nouvel utilisateur</Button>
        </>
      }
    >
      <div className="space-y-4">
        {isLoading && <div>Chargement...</div>}
        <Table
          columns={columns}
          data={rows}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <UserForm
          open={open}
          onClose={() => setOpen(false)}
          title={editing ? "Modifier un utilisateur" : "Créer un utilisateur"}
          initialValues={editing ?? undefined}
          onSubmit={async (values) => {
            await upsert(values);
            setOpen(false);
          }}
        />

        <DeleteConfirm
          open={!!toDelete}
          onClose={() => setToDelete(null)}
          onConfirm={confirmDelete}
        />
      </div>
    </Page>
  );
};

export default Users;
