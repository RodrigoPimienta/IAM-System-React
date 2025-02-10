import { useNavigate } from "react-router";
import { CustomForm } from "../../../components/CustomForm";
import { usePermissions } from "../../../hooks/usePermissions";

const moduleKey = "users";

export const AddUser = () => {
    const { permissions } = usePermissions();
    const permissionsPage = permissions[moduleKey]?.permissions || {};
    const navigate = useNavigate();
  
    const handleAddUser = (formData) => {
      console.log("User added:", formData);
      // Aquí puedes enviar los datos a la API con fetch o axios
    };
  
    return (
      <>
        <CustomForm
          title="Add User"
          permissionsPage={permissionsPage}
          actionsHeader={[]}
          fields={[
            { id: "name", input: "input", type: "text", label: "Name", placeholder: "Enter name", required: true },
            { id: "email", input: "input", type: "email", label: "Email", placeholder: "Enter email", required: true },
            { id: "password", input: "input", type: "password", label: "Password", placeholder: "Enter password", required: true },
            {
              id: "profile",
              input: "select",
              label: "Profile",
              required: true,
              init: "Select profile",
              options: [
                { value: "1", label: "Admin" },
                { value: "2", label: "User" },
              ],
            },
            {
              id: "status",
              input: "select",
              label: "Status",
              required: true,
              init: "Select status",
              options: [
                { value: "1", label: "Active" },
                { value: "0", label: "Inactive" },
              ],
            },
          ]}
          buttons={[
            { key: "add", label: "Add", type: "submit" }, // Este botón ahora usará submit
            { key: "cancel", label: "Cancel", handle: () => navigate("/admin/users") },
          ]}
          onSubmit={handleAddUser} // Se ejecutará solo al enviar el formulario
        />
      </>
    );
  };
  