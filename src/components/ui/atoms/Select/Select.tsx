import { type FC, useState } from "react";

export type SelectComponent<T> = FC<SelectComponentProps<T>>;

interface DataTypeSelectProps<T> {
    value: T;
    onChange: (value: T) => void;
    selectComponent: SelectComponent<T>;
}

type SelectComponentProps<T> = Pick<DataTypeSelectProps<T>, "value" | "onChange"> & {
    items?: Array<T>;
    disabled?: boolean;
};


export default function Select<T>({
    value,
    onChange,
    selectComponent: SelectComponent
}: DataTypeSelectProps<T>) {
    const [selectedValue, setSelectedValue] = useState<T>(value);
    
    const handleChange = (newValue: T) => {
        try {
            onChange(newValue);
            setSelectedValue(newValue);
        }
        catch (error) {
            console.error(`Error changing value: ${error}`);
        }
    };

    return <SelectComponent value={selectedValue} onChange={handleChange} />;
}