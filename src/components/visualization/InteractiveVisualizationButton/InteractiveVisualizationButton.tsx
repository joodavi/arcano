import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";

interface ToggleInteractiveVisualizationProps {
    onToggle: (value: boolean) => void;
}

export default function InteractiveVisualizationButton({ onToggle }: ToggleInteractiveVisualizationProps) {
    const [interactiveVisualization, setInteractiveVisualization] = useState<boolean>(false);

    const handleToggle = () => {
        const newValue = !interactiveVisualization;
        setInteractiveVisualization(newValue);
        onToggle(newValue);
    }

    return (
        <Button
            icon={interactiveVisualization ? <StarFilled /> : <StarOutlined />}
            onClick={handleToggle}
            style={{ position: 'absolute', top: 80, right: 30 }}
            type="primary"
        />
    )
}