import { SearchOutlined } from "@ant-design/icons";
import { Flex, Input, Splitter, Typography } from "antd";
import { useState } from "react";
import { Navigate, useParams } from "react-router";
import DataColumnsDnDList from "../components/data/DataColumnsDnDList/DataColumnsDnDList";
import MainVisualization from "../components/visualization/MainVisualization/MainVisualization";
import SaveVisualizationButton from "../components/visualization/SaveVisualizationButton/SaveVisualizationButton";
import { VegaLiteDataVisualization } from "../components/visualization/VegaLiteDataVisualization/VegaLiteDataVisualization";
import VisualizationMappingBuilder from "../components/visualization/VisualizationMappingBuilder/VisualizationMappingBuilder";
import { ROUTES } from "../consts/routes";
import { VegaLiteDefaultViewConfig } from "../lib/visualization/VegaLite/VegaLiteConsts";
import useDatasets from "../stores/dataset";
import useVisualizations from "../stores/visualizations";
import { CountOfRecordsColumn, type VisMapping } from "../types/Visualization";

export function VisualizationBuilderDnD() {
    const { getDatasetById } = useDatasets();
    const { visualizations } = useVisualizations();
    const { datasetId, visualizationId } = useParams();
    if (!datasetId) {
        return <Navigate to={ROUTES.HOME} />;
    }

    const dataset = getDatasetById(datasetId);
    if (!dataset) {
        return <Navigate to={ROUTES.HOME} />;
    }

    const visualization = visualizationId ? (visualizations.find((vis) => vis.id === visualizationId) ?? null) : null;

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [visMapping, setVisMapping] = useState<VisMapping>({
        xAxis: [...(visualization?.visMapping.xAxis ?? [])],
        yAxis: [...(visualization?.visMapping.yAxis ?? [])],
        color: [...(visualization?.visMapping.color ?? [])],
        size: [...(visualization?.visMapping.size ?? [])],
    });

    return (
        <Flex vertical gap={8} justify="center" align="center" style={{ height: '100%' }}>
            {
                dataset &&
                <Splitter>
                    <Splitter.Panel collapsible defaultSize="20%" min='15%' style={{ padding: '5px 20px' }}>
                        <Flex vertical gap={10}>
                            <Typography.Title level={3}>
                                Data columns
                            </Typography.Title>
                            <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Type to search columns..." suffix={<SearchOutlined />} />
                            <DataColumnsDnDList
                                columns={dataset.getColumsMapping().filter(column => column.name.includes(searchTerm))}
                                pull="clone"
                                put={false}
                                addCountOfRecords={CountOfRecordsColumn.name.includes(searchTerm)}
                            />
                        </Flex>
                    </Splitter.Panel>
                    <Splitter.Panel collapsible defaultSize="20%" min='15%' style={{ padding: '5px 20px' }}>
                        <Flex vertical gap={10}>
                            <Typography.Title level={3}>
                                Visual channels
                            </Typography.Title>
                            <VisualizationMappingBuilder
                                visMapping={visMapping}
                                setVisMapping={setVisMapping}
                                dataset={dataset}
                            />
                        </Flex>
                    </Splitter.Panel>
                    <Splitter.Panel min='60%' style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <SaveVisualizationButton
                            visualization={visualization}
                            visMapping={visMapping}
                            dataset={dataset}
                        />
                        <MainVisualization
                            visualizationComponent={VegaLiteDataVisualization}
                            dataset={dataset}
                            visMapping={visMapping}
                            visConfig={VegaLiteDefaultViewConfig}
                            isInteractive={false}
                        />
                    </Splitter.Panel>
                </Splitter>
            }
        </Flex>
    );
}