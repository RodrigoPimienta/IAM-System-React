import { useNavigate } from "react-router";
import { usePermissions } from "../../../hooks/usePermissions";
import { useUsers } from "../hooks/useUsers";
import { Loading, Error , CustomForm} from "../../../components";
import Swal from "sweetalert2";


const moduleKey = "users";

export const AddUser = () => {
    const navigate = useNavigate();
    const { permissions } = usePermissions();
    const permissionsPage = permissions[moduleKey]?.permissions || {};
    const {postUser, isLoading} = useUsers();

    const handleAddUser = (formData) => {
      postUser.mutate(formData, {
          onSuccess: () => {
              Swal.fire({
                  icon: "success",
                  title:"Success",
                  text: "User added successfully",
                  showConfirmButton: true,
                  timer: 4000,
              }).then(() => {
                  navigate("/admin/users");
              });
          },
          onError: (err) => {
              Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: err.message,
              });
          },
      });
  };
  

    return (
      <>
       {isLoading && <Loading />}
        <CustomForm
          title="Add user"
          permissionsPage={permissionsPage}
          actionsHeader={[]}
          fields={[
            { key: "name", input: "input", type: "text", label: "Name", placeholder: "Enter name", required: true },
            { key: "email", input: "input", type: "email", label: "Email", placeholder: "Enter email", required: false },
            { key: "password", input: "input", type: "password", label: "Password", placeholder: "Enter password", required: true },
            { key: "password_confirmation", input: "input", type: "password", label: "Password confirmation", placeholder: "Enter password", required: true, validation: "same:password" },
            {
              key: "profile",
              input: "select",
              label: "Profile",
              required: false,
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

  