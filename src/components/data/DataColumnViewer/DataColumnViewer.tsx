import { Flex, Typography } from "antd";
import type { ReactNode } from "react";
import type { ColumnMapping } from "../../../types/Visualization";
import { COLUMN_TYPE_TO_METADATA } from "../../../consts/dataTypes";
import { QuantitativeAgregationFunctions } from "../../../types/Dataset";

type DataColumnTypeEditorProps = {
    column: ColumnMapping;
    children?: ReactNode;
    showDataTypeColor?: boolean;
    onClick?: (column: ColumnMapping) => void;
};

export default function DataColumnViewer({ column, children, showDataTypeColor = false, onClick }: DataColumnTypeEditorProps) {
    return (
        <Flex
            align="center"
            justify="space-between"
            style={{
                padding: '0px 10px',
                border: `1px solid ${showDataTypeColor ? COLUMN_TYPE_TO_METADATA[column.type].color : '#C7C7C7'}`,
                borderRadius: '5px',
                cursor: onClick ? 'pointer' : 'default',
                minWidth: '100px',
            }}
            onClick={(_) => onClick?.(column)}
        >
            <Typography
                style={{
                    flex: 1,
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    color: showDataTypeColor ? COLUMN_TYPE_TO_METADATA[column.type].color : '#000000'
                }}
            >
                {column.name} &nbsp;
                {
                    column.options?.aggregationFunction && 
                    column.options?.aggregationFunction !== QuantitativeAgregationFunctions.NONE && 
                    `(${column.options?.aggregationFunction?.name})`
                }
            </Typography>
            <Flex gap={2} align="center" justify="space-between">
                {children}
            </Flex>
        </Flex>
    );
}