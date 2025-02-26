import { useNavigate, useParams  } from "react-router";
import Swal from "sweetalert2";
import { useError } from "../../../hooks/";
import { Loading , CustomForm} from "../../../components";
import { useUsers } from "../hooks/useUsers";


export const UpdateUser = ({ title, permissionsPage }) => {
    const navigate = useNavigate();
    // Obtener el id del usuario de la URL
    const { id_user } = useParams();
    const { handleGlobalError } = useError();
    const {editUser, resUsers, isLoading} = useUsers();
    const user = resUsers.find((user) => user.id_user == id_user);

    if(!user) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "User not found",
            timer: 3000,
        }).then(() => {
            navigate("/admin/users");
        });
    }

    const handleUpdateUser = (formData) => {
        editUser.mutate({id_user, userData:formData}, {
          onSuccess: () => {
              Swal.fire({
                  icon: "success",
                  title:"Success",
                  text: "User updated successfully",
                  showConfirmButton: true,
                  timer: 4000,
              }).then(() => {
                  navigate("/admin/users");
              });
          },
          onError: (error) => handleGlobalError(error),
      });
  };
  

    return (
      <>
       {isLoading && <Loading />}
        <CustomForm
          title={title}
          permissionsPage={permissionsPage}
          actionsHeader={[]}
          fields={[
            { key: "name", input: "input", type: "text", label: "Name", placeholder: "Enter name", required: true},
            { key: "email", input: "input", type: "email", label: "Email", placeholder: "Enter email", required: false},
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
          // definir un array asocitivo con los defaults values

            defaultValues={{
                name: user.name,
                email: user.email,
                profile: user.id_profile,
            }}
        
          buttons={[
            { key: "cancel", label: "Cancel", handle: () => navigate("/admin/users") },
            { key: "update", label: "Submit", type: "submit" }, // Este botón ahora usará submit
          ]}
          onSubmit={handleUpdateUser} // Se ejecutará solo al enviar el formulario
        />
      </>
    );
  };

