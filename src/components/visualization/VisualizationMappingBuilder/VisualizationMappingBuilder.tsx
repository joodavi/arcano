import { Flex } from "antd";
import type { Dispatch, SetStateAction } from "react";
import type { ColumnMapping, VisMapping } from "../../../types/Visualization";
import DataColumnsSelectList from "../../data/DataColumnsSelectList/DataColumnsSelectList";
import VisualizationMappingChannelField from "./VisualizationMappingBuilderChannel";
import type { Dataset } from "../../../types/Dataset";

interface VisualizationMappingBuilderProps {
    visMapping: VisMapping;
    setVisMapping: Dispatch<SetStateAction<VisMapping>>;
    dataset: Dataset;
}

export default function VisualizationMappingBuilder({
    visMapping,
    setVisMapping,
    dataset
}: VisualizationMappingBuilderProps) {

    function setColumns(list: keyof VisMapping, columns: Array<ColumnMapping>) {
        setVisMapping(prevVisMapping => ({
            ...prevVisMapping,
            [list]: [...columns]
        }));
    }

    return (
        <Flex vertical gap={10}>
            <VisualizationMappingChannelField
                text="X axis"
            >
                <DataColumnsSelectList
                    columns={visMapping.xAxis}
                    setColumns={(columns) => setColumns("xAxis", columns)}
                    disabled={visMapping.xAxis.length > 0}
                    columnOptions={dataset.getColumsMapping()}
                    addCountOfRecords
                />
            </VisualizationMappingChannelField>
            <VisualizationMappingChannelField
                text="Y axis"
            >
                <DataColumnsSelectList
                    columns={visMapping.yAxis}
                    setColumns={(columns) => setColumns("yAxis", columns)}
                    disabled={visMapping.yAxis.length > 0}
                    columnOptions={dataset.getColumsMapping()}
                    addCountOfRecords
                />
            </VisualizationMappingChannelField>
            <VisualizationMappingChannelField
                text="Color"
            >
                <DataColumnsSelectList
                    columns={visMapping.color}
                    setColumns={(columns) => setColumns("color", columns)}
                    disabled={visMapping.color.length > 0}
                    columnOptions={dataset.getColumsMapping()}
                    addCountOfRecords
                />
            </VisualizationMappingChannelField>
            <VisualizationMappingChannelField
                text="Size"
            >
                <DataColumnsSelectList
                    columns={visMapping.size}
                    setColumns={(columns) => setColumns("size", columns)}
                    disabled={visMapping.size.length > 0}
                    columnOptions={dataset.getColumsMapping()}
                    addCountOfRecords
                />
            </VisualizationMappingChannelField>
        </Flex>
    );
}