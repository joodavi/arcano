import { Select } from "antd";
import { ColumnType, type Column } from "../../../../types/Dataset";
import type { SelectComponent } from "./Select";

export const DataTypeSelectSelect: SelectComponent<Column["type"]> = ({ value, onChange }) => {
    return (
        <Select size="small" style={{ width: '120px' }} value={value} onChange={onChange}>
            {
                Object.values(ColumnType).map((type) => (
                    <Select.Option key={type} value={type}>
                        {type}
                    </Select.Option>
                ))
            }
        </Select>
    );
};