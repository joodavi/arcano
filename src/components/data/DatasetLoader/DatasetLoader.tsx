import { SaveOutlined } from "@ant-design/icons";
import { Button, Flex, Switch, Typography } from "antd";
import { useEffect, useState } from "react";
import useDatasets from "../../../stores/dataset";
import { Dataset } from "../../../types/Dataset";
import LoadFileInput from "../LoadFileInput/LoadFileInput";
import SimpleTableViewer from "../SimpleTableViewer/SimpleTableViewer";

interface DatasetLoaderProps {
    onAddDataset: () => void;
}

export default function DatasetLoader({ onAddDataset }: DatasetLoaderProps) {
    const { addDataset } = useDatasets();
    const [loadedDataset, setLoadedDataset] = useState<Dataset | null>(null);

    const processFileContent = (file: File, content: string) => {
        const dataset = new Dataset(content, file.name);
        setLoadedDataset(dataset);
    };

    const handleAddDataset = () => {
        if (loadedDataset) {
            addDataset(loadedDataset);
            setLoadedDataset(null);
            onAddDataset();
        }
    };

    useEffect(() => {
        return () => {
            setLoadedDataset(null);
        };
    }, []);

    return (
        <Flex vertical gap={8} justify="center" align="center" style={{ height: '100%' }}>
            <Typography.Title level={3}>Select a CSV file to load</Typography.Title>
            <LoadFileInput onFileLoad={processFileContent} />
            {loadedDataset &&
                <Flex vertical gap={10} align="center">
                    <SimpleTableViewer dataset={loadedDataset} />
                    <Button
                        icon={<SaveOutlined />}
                        type="primary"
                        onClick={handleAddDataset}
                    >
                        Save this dataset
                    </Button>
                </Flex>
            }
        </Flex>
    );
}