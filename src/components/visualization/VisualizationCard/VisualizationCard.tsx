import { BarChartOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Typography } from "antd";
import type { Visualization } from "../../../types/Visualization";
import { Fragment } from "react/jsx-runtime";
import ConfirmationModal from "../../ui/molecules/ConfirmationModal/ConfirmationModal";
import { useState } from "react";
import useVisualizations from "../../../stores/visualizations";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../consts/routes";
import { VegaLiteDataVisualization } from "../VegaLiteDataVisualization/VegaLiteDataVisualization";
import useDatasets from "../../../stores/dataset";
import { VegaLiteDefaultViewConfig } from "../../../lib/visualization/VegaLite/VegaLiteConsts";

export default function VisualizationCard({ item: visualization }: { item: Visualization; }) {
    const navigate = useNavigate();
    const { removeVisualization } = useVisualizations();
    const { getDatasetById } = useDatasets();
    const [openDeleteVisModal, setOpenDeleteVisModal] = useState<boolean>(false);
    const dataset = getDatasetById(visualization.datasetId);

    const handleDeleteVisualization = async () => {
        setOpenDeleteVisModal(true);
    };

    const onConfirmDeleteVisualization = () => {
        removeVisualization(visualization.id);
    };

    return (
        <Fragment>
            {
                dataset &&
                <Card
                    title={visualization.name}
                    size="small"
                    style={{ height: '350px', width: '450px' }}
                >
                    <Flex vertical gap={1} justify="space-between">
                        <Flex style={{ height: '250px', width: "100%" }} align="center" justify="center">
                            <VegaLiteDataVisualization
                                dataset={dataset}
                                visMapping={visualization.visMapping}
                                visConfig={VegaLiteDefaultViewConfig}
                                isInteractive={false}
                            />
                        </Flex>
                        <Flex gap={4} justify="flex-end" align="center">
                            <Button
                                type="primary"
                                icon={<BarChartOutlined />}
                                onClick={() => navigate(`${ROUTES.DATASET}/${visualization.datasetId}${ROUTES.VISUALIZATION}/${visualization.id}`)}
                                style={{ width: "80%" }}
                            >
                                Visualize
                            </Button>
                            <Button
                                onClick={handleDeleteVisualization}
                                danger
                                icon={<DeleteOutlined />}
                                style={{ width: "20%" }}
                            />
                        </Flex>
                    </Flex>
                </Card>
            }
            <ConfirmationModal
                title="This action is irreversible..."
                open={openDeleteVisModal}
                onConfirm={onConfirmDeleteVisualization}
                onCancel={() => setOpenDeleteVisModal(false)}
            >
                <Typography>Do you really want to delete visualization <b>{visualization.name}</b>?</Typography>
            </ConfirmationModal>
        </Fragment>
    );
}