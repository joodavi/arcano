import type { Dataset } from '../../../types/Dataset';
import './SimpleTableViewer.css';

type SimpleTableViewerProps = {
    dataset: Dataset;
    nlines?: number;
};

export default function SimpleTableViewer({ dataset, nlines }: SimpleTableViewerProps) {
    const headers = dataset.getHeaders();
    const rows = dataset.getRows();

    return (
        <div>
            <h3>Data sample:</h3>
            <div className='SimpleTableViewer-container'>
                <table className="SimpleTableViewer">
                    <thead>
                        <tr>
                            {headers.map((header) => (
                                <th key={header}>
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.slice(0, nlines ?? 5).map((_, rowIndex) => (
                            <tr key={`row-${rowIndex}`}>
                                {Object.keys(rows[rowIndex]).map((column) => (
                                    <td key={`${column}-${rowIndex}`}>
                                        {rows[rowIndex][column].toString() ?? ''}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}