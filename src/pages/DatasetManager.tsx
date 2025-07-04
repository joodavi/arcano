import { Flex, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Navigate, useParams } from "react-router";
import DataColumnsViewer from "../components/data/DataColumnsViewer/DataColumnsViewer";
import ShowEditField from "../components/ui/molecules/ShowEditField/ShowEditField";
import { ROUTES } from "../consts/routes";
import useDatasets from "../stores/dataset";

// This page renders the dataset manager, where you can edit the dataset type and other dataset properties, such as the description.

export default function DatasetManager() {
    const { updateDataset, getDatasetById } = useDatasets();
    const { datasetId } = useParams();
    if (!datasetId) {
        return <Navigate to={ROUTES.HOME} />;
    }
    
    const selectedDataset = getDatasetById(datasetId);
    if(!selectedDataset) {
        return <Navigate to={ROUTES.HOME} />;
    }

    const handleEditDatasetName = (newName: string) => {
        selectedDataset.setName(newName);
        updateDataset(selectedDataset.getId(), selectedDataset);
    };

    const handleEditDatasetDescription = (newDescription: string) => {
        selectedDataset.setDescription(newDescription);
        updateDataset(selectedDataset.getId(), selectedDataset);
    };

    return (
        <Flex vertical align="flex-start" style={{ height: '100%', padding: '10px 30px' }}>
            <Flex align="center" gap={20}>
                <ShowEditField
                    value={selectedDataset.getName()}
                    onEdit={handleEditDatasetName}
                    typographyComponent={Typography.Title}
                />
            </Flex>
            <ShowEditField
                value={
                    selectedDataset.getDescription()?.length > 0 
                    ? selectedDataset.getDescription() 
                    : 'This dataset does not have a description text'
                }
                onEdit={handleEditDatasetDescription}
                typographyComponent={Typography.Text}
                inputComponent={TextArea}
            />
            {
                selectedDataset.getDescription() &&
                <Typography.Text>{selectedDataset.getDescription()}</Typography.Text>
            }
            <DataColumnsViewer dataset={selectedDataset} />
        </Flex>
    );
}