import { CloseOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Typography } from "antd";
import { type ChangeEvent, type CSSProperties, type FC, useState } from "react";

interface ShowEditFieldProps {
    value: string;
    typographyComponent?: FC<{
        style?: CSSProperties, 
        children: string
    }>;
    inputComponent?: FC<{
        style?: CSSProperties, 
        value: string, 
        onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    }>;
    onEdit: (value: string) => void;
}

export default function ShowEditField({ 
    value, 
    inputComponent: InputComponent = Input,
    typographyComponent: TypographyComponent = Typography,
    onEdit, 

}: ShowEditFieldProps) {
    const [textValue, setTextValue] = useState<string>(value);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTextValue(e.target.value);
    };

    const handleSave = () => {
        onEdit(textValue);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTextValue(value);
        setIsEditing(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    return (
        <Flex style={{height: '50px'}} gap={8} align="center" justify="space-between">
            {
                isEditing
                    ? <InputComponent style={{minWidth: '200px'}} value={textValue} onChange={handleInputChange} />
                    : <TypographyComponent>{textValue}</TypographyComponent>
            }
            {
                isEditing
                    ? <Flex gap={8} align="center" justify="space-between">
                        <Button icon={<SaveOutlined />} onClick={handleSave} />
                        <Button icon={<CloseOutlined />} onClick={handleCancel} />
                    </Flex>
                    : <Button icon={<EditOutlined />} onClick={handleEdit} />
            }
        </Flex>
    );
}