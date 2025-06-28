import { Flex } from "antd";
import useDatasets from "../../../stores/dataset";
import type { Column, Dataset } from "../../../types/Dataset";
import { DataTypeSelectMenu } from "../../ui/atoms/Select/DataTypeSelectMenu";
import Select from "../../ui/atoms/Select/Select";
import DataColumnViewer from "../DataColumnViewer/DataColumnViewer";

export default function DataColumnsViewer({ dataset }: { dataset: Dataset; }) {
    const { updateDataset } = useDatasets();

    const handleColumnTypeChange = (columnId: string, newType: Column['type']) => {
        if (!dataset) return;
        try {
            dataset?.changeColumnType(columnId, newType);
            updateDataset(dataset.getId(), dataset);
        }
        catch (e) {
            if (e instanceof Error) {
                throw new Error(e.message);
            }
            throw new Error("An unknown error occurred.");
        }
    };

    return (
        <div>
            <h2>Data columns:</h2>
            <Flex
                vertical
                gap={4}
            >
                {
                    dataset?.getColumns().map((column) => (
                        <DataColumnViewer
                            key={column.id}
                            column={column}
                        >
                            <Select
                                key="select-column-type"
                                value={column.type}
                                onChange={
                                    (columnType) => {
                                        try {
                                            handleColumnTypeChange(column.id, columnType);
                                        }
                                        catch (error) {
                                            throw new Error(`Error changing column type: ${error}`);
                                        }
                                    }}
                                selectComponent={DataTypeSelectMenu}
                            />
                        </DataColumnViewer>
                    ))
                }
            </Flex>
            {
                !dataset && <p>No dataset loaded.</p>
            }
        </div>
    );
}