export const CustomTable = ({ columns, rows, ActionsComponent }) => {
    return (
        <table>
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index}>{column.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((column, colIndex) => (
                            <td key={colIndex} className={ column.key === 'actions' ? 'rowActions' : ''}>
                                {column.render ? column.render(row, ActionsComponent) : row[column.key] || '-'}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
