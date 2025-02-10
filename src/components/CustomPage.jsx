import { CustomTable, CustomActions,CustomHeader  } from "./index";

export const CustomPage = ({permissionsPage, actions, actionsHeader, rows, columns}) => {
    const ActionsComponent = (props) => (
        <CustomActions {...props} permissions={permissionsPage} actions={actions} />
    );
    
  return (
    <>
        <section className="section">
            {/* Divide en 2, para inster a la izquiera el titutlo y a la derecha imprimir el boton de agregar */}
            <section className="section headerSection">
                <CustomHeader title='Users' permissions={permissionsPage} actions={actionsHeader} />
            </section>
        </section>
        <section className="section">
            <CustomTable columns={columns} rows={rows} ActionsComponent={ActionsComponent} />
        </section>
    </>
  )
}
