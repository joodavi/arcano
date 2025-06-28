import { FunctionOutlined } from "@ant-design/icons";
import { Badge, Button, Dropdown, type MenuProps } from "antd";
import Link from "antd/es/typography/Link";
import { type QuantitativeAgregationFunction, QuantitativeAgregationFunctions } from "../../../../types/Dataset";
import type { SelectComponent } from "./Select";

export const DataFunctionSelectMenu: SelectComponent<QuantitativeAgregationFunction> = ({ value, onChange }) => {
    const items: MenuProps['items'] = Object.values(QuantitativeAgregationFunctions).map((aggFn) => (
        {
            key: aggFn.name,
            label: (
                <Link style={{ display: 'flex', gap: 10 }} onClick={() => onChange(aggFn)}>
                    <FunctionOutlined />
                    {aggFn.name}
                </Link>
            ),
        }
    ));

    return (
        <Dropdown menu={{ items }} trigger={["click"]} placement="topRight" arrow>
            <Button
                icon={<FunctionOutlined />}
                type="text"
                size="small"
            />
        </Dropdown>
    );
};