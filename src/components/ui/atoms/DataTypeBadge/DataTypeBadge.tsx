import { Badge } from "antd";
import { COLUMN_TYPE_TO_METADATA } from "../../../../consts/dataTypes";
import type { ColumnType } from "../../../../types/Dataset";

interface DataTypeBadgeProps {
    columnType: ColumnType;
}

export default function DataTypeBadge({
    columnType
}: DataTypeBadgeProps) {
    const { code, color } = COLUMN_TYPE_TO_METADATA[columnType];
    return (
        <Badge
            count={code}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: "none",
                border: `1px solid ${color}`,
                borderRadius: "4px",
                color: '#404040',
                width: "24px"
            }}
        />
    );
}