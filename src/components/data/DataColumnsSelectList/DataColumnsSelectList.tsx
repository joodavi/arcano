import { Button, Flex } from "antd";
import type { FC } from "react";
import { type ColumnMapping, CountOfRecordsColumn } from "../../../types/Visualization";
import { ColumnsSelectMenu } from "../../ui/atoms/Select/ColumnSelectMenu";
import DataColumnViewer from "../DataColumnViewer/DataColumnViewer";
import type { DataColumnsDnDListSelectAdapterProps } from "../DataColumnsDnDList/DataColumnsDnDList";
import { CloseOutlined } from "@ant-design/icons";
import Select from "../../ui/atoms/Select/Select";
import { ColumnType, QuantitativeAgregationFunctions, type QuantitativeAgregationFunction } from "../../../types/Dataset";
import { DataFunctionSelectMenu } from "../../ui/atoms/Select/DataFunctionSelectMenu";

interface DataColumnsSelectListProps {
    columns: Array<ColumnMapping>;
    setColumns: (columns: Array<ColumnMapping>) => void;
    disabled?: boolean;
    columnItemActions?: Array<{ filterFn: (column: ColumnMapping) => boolean, actionButton: FC<DataColumnsDnDListSelectAdapterProps>; }>;
    addCountOfRecords?: boolean;
    columnOptions: Array<ColumnMapping>;
}

export default function DataColumnsSelectList({
    columns,
    setColumns,
    addCountOfRecords,
    columnOptions,
}: DataColumnsSelectListProps) {
    const allColumns = addCountOfRecords ? [...columnOptions, CountOfRecordsColumn] : [...columns];

    const changeColumnAggFn = (columnId: string, aggFn: QuantitativeAgregationFunction) => {
        const newColumns = [...columns];
        const index = newColumns.findIndex(c => c.id === columnId);
        newColumns[index] = { ...newColumns[index], options: { aggregationFunction: aggFn } };
        setColumns?.(newColumns);
    };

    const removeColumn = (columnId: string) => {
        const newColumns = [...columns];
        const index = newColumns.findIndex(c => c.id === columnId);
        newColumns.splice(index, 1);
        setColumns?.(newColumns);
    };

    return (
        <Flex gap={2} justify="flex-start" align="center">
            {
                columns.map(column => (
                    <DataColumnViewer
                        key={column.id}
                        column={column}
                        showDataTypeColor
                    >

                        {
                            column.type === ColumnType.QUANTITATIVE
                            && column.id !== CountOfRecordsColumn.id
                            && <Select
                                value={
                                    column.options?.aggregationFunction
                                    ?? QuantitativeAgregationFunctions.NONE
                                }
                                onChange={(aggFn) => changeColumnAggFn(column.id, aggFn)}
                                selectComponent={DataFunctionSelectMenu}
                            />
                        }

                        <Button
                            type="text"
                            size="small"
                            icon={<CloseOutlined />}
                            onClick={() => removeColumn(column.id)}
                        />
                    </DataColumnViewer>
                ))
            }
            <ColumnsSelectMenu
                onChange={(column) => setColumns([...columns, column])}
                value={columns[0]}
                items={allColumns}
                disabled={columns.length > 0}
            />
        </Flex>
    );
}