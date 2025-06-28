import { BarChartOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Fragment } from "react/jsx-runtime";
import { ROUTES } from "../../../consts/routes";
import useDatasets from "../../../stores/dataset";
import type { Dataset } from "../../../types/Dataset";
import ConfirmationModal from "../../ui/molecules/ConfirmationModal/ConfirmationModal";
import useVisualizations from "../../../stores/visualizations";

export default function DatasetCard({ item: dataset }: {item: Dataset}) {
    const { removeDataset } = useDatasets();
    const { removeVisualizationFromDataset } = useVisualizations();
    const [openDeleteDatasetModal, setOpenDeleteDatasetModal] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleDeleteDataset = async () => {
        setOpenDeleteDatasetModal(true);
    };

    const onConfirmDeleteDataset = () => {
        removeVisualizationFromDataset(dataset.getId());
        removeDataset(dataset.getId());
    };

    return (
        <Fragment>

            <Card
                size="small"
                title={dataset.getName()}
                style={{ width: 250 }}
            >
                <Flex vertical style={{ height: 125 }} gap={2} justify="space-between">
                    <Flex vertical gap={2}>
                        <Typography>Rows: {dataset.getRows().length}</Typography>
                        <Typography>Columns: {dataset.getColumns().length}</Typography>
                        <Typography>Type: {dataset.getUniqueTypes()}</Typography>
                    </Flex>
                    <Flex gap={4} justify="space-between" align="center">
                        <Button
                            type="primary"
                            icon={<BarChartOutlined />}
                            onClick={() => navigate(`${ROUTES.DATASET}/${dataset.getId()}${ROUTES.VISUALIZATION}`)}
                            style={{width: "60%"}}
                        >
                            Visualize
                        </Button>
                        <Button
                            icon={<EditOutlined />}
                            onClick={() => navigate(`${ROUTES.DATASET}/${dataset.getId()}`)}
                            style={{width: "20%"}}
                        />
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={handleDeleteDataset}
                            style={{width: "20%"}}
                        />
                    </Flex>
                </Flex>
            </Card>

            <ConfirmationModal
                title="This action is irreversible..."
                open={openDeleteDatasetModal}
                onConfirm={onConfirmDeleteDataset}
                onCancel={() => setOpenDeleteDatasetModal(false)}
            >
                <Typography>Do you really want to delete dataset <b>{dataset.getName()}</b>?</Typography>
            </ConfirmationModal>
        </Fragment>
    );
}