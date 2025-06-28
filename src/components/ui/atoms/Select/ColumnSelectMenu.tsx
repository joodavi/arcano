import { CloseOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Input, Popover } from "antd";
import type { ColumnMapping } from "../../../../types/Visualization";
import DataColumnViewer from "../../../data/DataColumnViewer/DataColumnViewer";
import type { SelectComponent } from "./Select";
import { useState } from "react";

export const ColumnsSelectMenu: SelectComponent<ColumnMapping> = ({ onChange, items, disabled }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const content = (
        <Flex vertical justify="start" gap={10}>
            <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                size="small"
                placeholder="Type to search columns..."
                suffix={<SearchOutlined />}
            />
            <Flex
                vertical
                gap={2}
                align="stretch"
                style={{
                    maxHeight: '300px',
                    overflowY: 'auto'
                }}
            >
                {
                    items
                        ?.filter(column => column.name.includes(searchTerm))
                        ?.map(column => (
                            <DataColumnViewer
                                key={column.id}
                                column={column}
                                showDataTypeColor
                                onClick={onChange}
                            />
                        ))
                }
            </Flex>
        </Flex>
    );

    return (
        <Popover placement="topLeft" title={"Columns"} content={content} trigger={["click"]}>
            <Button disabled={disabled} size="small" type="dashed" icon={<PlusOutlined />}>Add</Button>
        </Popover>
    );
};