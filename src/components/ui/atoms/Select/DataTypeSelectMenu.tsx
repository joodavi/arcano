import { FontSizeOutlined, HourglassOutlined, NumberOutlined, SortAscendingOutlined } from "@ant-design/icons";
import { Button, Dropdown, type MenuProps } from "antd";
import Link from "antd/es/typography/Link";
import type { ReactNode } from "react";
import { ColumnType, type Column } from "../../../../types/Dataset";
import type { SelectComponent } from "./Select";

const COLUMN_TYPE_TO_ICON: Record<ColumnType, ReactNode> = {
    [ColumnType.CATEGORICAL]: <FontSizeOutlined />,
    [ColumnType.ORDINAL]: <SortAscendingOutlined />,
    [ColumnType.QUANTITATIVE]: <NumberOutlined />,
    [ColumnType.TEMPORAL]: <HourglassOutlined />
}

export const DataTypeSelectMenu: SelectComponent<Column["type"]> = ({ value, onChange }) => {
    const items: MenuProps['items'] = Object.values(ColumnType).map((type) => (
        {
            key: type,
            label: (
                <Link style={{ display: 'flex', gap: 10}} onClick={() => onChange(type)}>
                    {COLUMN_TYPE_TO_ICON[type]}
                    {type}
                </Link>
            ),
        }
    ));

    return (
        <Dropdown menu={{ items }} trigger={["click"]} placement="topRight" arrow>
            <Button icon={COLUMN_TYPE_TO_ICON[value]} type="default" size="small" />
        </Dropdown>
    );
};