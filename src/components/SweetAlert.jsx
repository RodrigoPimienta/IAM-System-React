
export const SweetAlert = ({icon, tittle, text}) => {
    // regresar un sweetalert con el icono, titulo y texto
    return (
      Swal.fire({
        icon: icon,
        title: tittle,
        text: text,
      })
    );
  }
  