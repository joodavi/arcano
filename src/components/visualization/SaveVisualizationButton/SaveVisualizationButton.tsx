import { SaveOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Popover } from "antd";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import type { Dataset } from "../../../types/Dataset";
import type { VisMapping, Visualization } from "../../../types/Visualization";
import useVisualizations from "../../../stores/visualizations";

interface SaveVisualizationButtonProps {
    visualization: Visualization | null;
    dataset: Dataset;
    visMapping: VisMapping;
};

export default function SaveVisualizationButton({ visualization, dataset, visMapping }: SaveVisualizationButtonProps) {
    const [openPopover, setOpenPopover] = useState<boolean>(false);


    const handleOpenChange = (newOpen: boolean) => {
        setOpenPopover(newOpen);
    };

    function SaveVisualizationDialog({ visualization, dataset, visMapping }: SaveVisualizationButtonProps) {
        const [visName, setVisName] = useState<string>(visualization?.name ?? "");
        const { addVisualization, updateVisualization } = useVisualizations();

        const handleSaveVisualization = () => {
            addVisualization({
                id: crypto.randomUUID(),
                datasetId: dataset.getId(),
                name: visName,
                visMapping: visMapping
            });
            setOpenPopover(false);
        };

        const handleUpdateVisualization = () => {
            if (visualization) {
                updateVisualization(
                    visualization.id,
                    {
                        id: visualization?.id,
                        datasetId: visualization?.datasetId,
                        name: visName,
                        visMapping: visMapping
                    }
                );
                setOpenPopover(false);
            }
        };

        return (
            <Flex gap={4}>
                <Input value={visName} onChange={(e) => setVisName(e.target.value)} placeholder="Visualization name..." />
                <Button
                    onClick={handleSaveVisualization}
                    disabled={visName.length === 0}
                    icon={<SaveOutlined />}
                >
                    {visualization ? "Save as new" : "Save"}
                </Button>
                {
                    visualization &&
                    <Button
                        onClick={handleUpdateVisualization}
                        disabled={visName.length === 0}
                        icon={<SaveOutlined />}
                    >
                        Update
                    </Button>
                }
            </Flex>
        );
    }

    return (
        <Fragment>
            <Popover
                placement="leftBottom"
                content={
                    <SaveVisualizationDialog
                        visualization={visualization}
                        visMapping={visMapping}
                        dataset={dataset}
                    />
                }
                title="Save visualization"
                trigger="click"
                open={openPopover}
                onOpenChange={handleOpenChange}
            >
                <Button
                    disabled={visMapping.xAxis.length === 0 && visMapping.yAxis.length === 0}
                    style={{ position: 'absolute', top: 30, right: 30 }}
                    icon={<SaveOutlined />}
                />
            </Popover>
        </Fragment>
    );
}