import { Flex, Select, Typography } from "antd";
import useDatasets from "../../../../stores/dataset";
import type { Dataset } from "../../../../types/Dataset";

interface DatasetSelectProps {
    selectedDataset: Dataset | null;
    onChange: (selectedDataset: Dataset) => void;
}

export default function DatasetSelect({ selectedDataset, onChange }: DatasetSelectProps) {
    const { datasets, getDatasetById } = useDatasets();

    const handleDatasetSelect = (datasetId: string) => {
        const dataset = getDatasetById(datasetId);
        if (dataset) {
            onChange(dataset);
        }
    };

    return (
        <Flex gap={5} align="center">
            <Typography>Selecione um dataset:</Typography>
            <Select
                size="small"
                style={{ width: '120px' }}
                value={selectedDataset?.getId() ?? ''}
                onChange={handleDatasetSelect}
            >
                {
                    datasets.map((dataset) => (
                        <Select.Option value={dataset.getId()} key={dataset.getId()}>{dataset.getName()}</Select.Option>
                    ))
                }
            </Select>
        </Flex>
    );

}