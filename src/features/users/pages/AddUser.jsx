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
            { key: "name", input: "input", type: "text", label: "Name", placeholder: "Enter name", required: true },
            { key: "email", input: "input", type: "email", label: "Email", placeholder: "Enter email", required: true },
            { key: "password", input: "input", type: "password", label: "Password", placeholder: "Enter password", required: true },
            { key: "password_confirmation", input: "input", type: "password", label: "Password confirmation", placeholder: "Enter password", required: true, validation: "same:password" },
            {
              key: "profile",
              input: "select",
              label: "Profile",
              required: true,
              init: "Select profile",
              options: [
                { value: "1", label: "Admin" },
                { value: "2", label: "User" },
              ],
            }
          ]}
          buttons={[
            { key: "cancel", label: "Cancel", handle: () => navigate("/admin/users") },
            { key: "add", label: "Submit", type: "submit" }, // Este botón ahora usará submit
          ]}
          onSubmit={handleAddUser} // Se ejecutará solo al enviar el formulario
        />
      </>
    );
  };

  