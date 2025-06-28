import { CloseOutlined } from "@ant-design/icons";
import { Button, theme } from "antd";
import type { FC } from "react";
import { ReactSortable, type Sortable } from "react-sortablejs";
import { type Column, ColumnType, type QuantitativeAgregationFunction, QuantitativeAgregationFunctions } from "../../../types/Dataset";
import { CountOfRecordsColumn, type ColumnMapping } from "../../../types/Visualization";
import DataTypeBadge from "../../ui/atoms/DataTypeBadge/DataTypeBadge";
import { DataFunctionSelectMenu } from "../../ui/atoms/Select/DataFunctionSelectMenu";
import Select from "../../ui/atoms/Select/Select";
import DataColumnViewer from "../DataColumnViewer/DataColumnViewer";

const { useToken } = theme;

export interface DataColumnsDnDListSelectAdapterProps {
    column: ColumnMapping,
    onChange: (column: ColumnMapping, aggFn: QuantitativeAgregationFunction) => void;
}

interface DataColumnsDnDListProps {
    columns: Array<ColumnMapping>;
    setColumns?: (columns: Array<ColumnMapping>) => void;
    groupName?: string,
    put?: Sortable.PutResult;
    pull?: Sortable.PullResult;
    disabled?: boolean;
    columnItemActions?: Array<{ filterFn: (column: ColumnMapping) => boolean, actionButton: FC<DataColumnsDnDListSelectAdapterProps>; }>;
    addCountOfRecords?: boolean;
}

const COLUMNS_GROUP = "columns-group";

export default function DataColumnsDnDList({
    columns,
    setColumns,
    groupName = COLUMNS_GROUP,
    put = true, 
    pull = true,
    disabled = false,
    addCountOfRecords = false,
}: DataColumnsDnDListProps) {
    const { token } = useToken();
    
    const allColumns = addCountOfRecords ? [...columns, CountOfRecordsColumn] : [...columns];

    const setList = (list: Array<ColumnMapping>) => {
        setColumns?.(list);
    };

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
        <ReactSortable
            group={{
                name: groupName,
                put: put,
                pull: pull
            }}
            animation={150}
            sort={false}
            style={{
                border: `1px dashed ${disabled ? token.colorTextDisabled : token.colorPrimary}`,
                backgroundColor: token.colorBgContainer,
                borderRadius: '5px',
                padding: 4,
                minHeight: '20px',
                listStyleType: 'none',
                display: 'grid',
                gap: '4px'
            }}
            list={allColumns}
            setList={setList}
            disabled={disabled}
        >
            {
                allColumns.map(column => (
                    <DataColumnViewer
                        key={column.id}
                        column={column}
                    >
                        {
                            setColumns 
                            && column.type === ColumnType.QUANTITATIVE 
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

                        <DataTypeBadge columnType={column.type} />

                        {
                            setColumns &&
                            <Button
                                type="text"
                                size="small"
                                icon={<CloseOutlined />}
                                onClick={() => removeColumn(column.id)}
                            />
                        }
                    </DataColumnViewer>
                ))
            }
        </ReactSortable>
    );
}