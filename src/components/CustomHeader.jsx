export const CustomHeader = ({title, actions = [], permissions = {}}) => {
    return (
        <>
            <h2>{title}</h2>
            {actions.map((action) => {
                return permissions[action.key] && (
                    <button key={action.key} onClick={() => action.handle()}
                        className={`btn btn_${action.key}`}>
                        {
                            action.label || permissions[action.key]
                    }
                    </button>
                );
            })}
        </>
    );
}
