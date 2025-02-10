export const CustomActions = ({ row, actions = [], permissions = {} }) => {

    return (
        <>
            {actions.map((action) => {
                return action.condition(row) && permissions[action.key] && (
                    <button key={action.key} onClick={() => action.handle(row)}
                        className={`btn btn_${action.key}`}>
                        {
                            action.label || permissions[action.key]
                    }
                    </button>
                );
            })}
        </>
    );
};