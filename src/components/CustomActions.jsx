export const CustomActions = ({ row, actions =[], permissions = [] }) => {

    const getPermission = (key) => permissions.find((perm) => perm.key === key);
    return (
        <>
        {
            actions.map((action) => {
                return action.Condition(row) && getPermission(action.key) && (
                    <button key={action.key} onClick={() => action.Handle(row.id)}>
                        {getPermission(action.key).Name}
                    </button>
                );
            })
        }
        </>
    );
};
