import { useNavigate } from "react-router";

import Swal from "sweetalert2";
import { useError } from "../../../hooks/";
import { Loading , CustomForm} from "../../../components";
import { useUsers } from "../hooks/useUsers";

export const AddUser =({ title, permissionsPage }) => {
    const navigate = useNavigate();
    const { handleGlobalError } = useError();

    const {postUser, isLoading} = useUsers({enabled: false});

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
            { key: "name", input: "input", type: "text", label: "Name", placeholder: "Enter name", required: true },
            { key: "email", input: "input", type: "email", label: "Email", placeholder: "Enter email", required: true },
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

  