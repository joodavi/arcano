import { SearchOutlined } from "@ant-design/icons";
import { json } from '@codemirror/lang-json';
import CodeMirror from '@uiw/react-codemirror';
import { Flex, Input } from "antd";
import { type Action, Actions, Layout, Model, type TabNode } from 'flexlayout-react';
import 'flexlayout-react/style/rounded.css';
import omit from 'lodash/omit';
import { useCallback, useMemo, useState } from "react";
import { Navigate, useParams } from "react-router";
import DataColumnsDnDList from "../components/data/DataColumnsDnDList/DataColumnsDnDList";
import InteractiveVisualizationButton from "../components/visualization/InteractiveVisualizationButton/InteractiveVisualizationButton";
import MainVisualization from "../components/visualization/MainVisualization/MainVisualization";
import SaveVisualizationButton from "../components/visualization/SaveVisualizationButton/SaveVisualizationButton";
import { VegaLiteDataVisualization } from "../components/visualization/VegaLiteDataVisualization/VegaLiteDataVisualization";
import VisualizationMappingBuilder from "../components/visualization/VisualizationMappingBuilder/VisualizationMappingBuilder";
import { FLEX_LAYOUT_BORDER_CONFIG, FlexLayoutPanel } from "../consts/layout";
import { ROUTES } from "../consts/routes";
import { VegaLiteDefaultViewConfig } from "../lib/visualization/VegaLite/VegaLiteConsts";
import useDatasets from "../stores/dataset";
import useVisualizations from "../stores/visualizations";
import { CountOfRecordsColumn, type VisMapping } from "../types/Visualization";
import './VisualizationBuilder.css';

export function VisualizationBuilder() {
    const { getDatasetById } = useDatasets();
    const { visualizations } = useVisualizations();
    const { datasetId, visualizationId } = useParams();
    const [visKey, setVisKey] = useState(0);
    const [interactiveVisualization, setInteractiveVisualization] = useState<boolean>(false);
    const [visSpec, setVisSpec] = useState<unknown>(null);
    const layoutModel = useMemo(() => Model.fromJson(FLEX_LAYOUT_BORDER_CONFIG), []);

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

    const handleChangeVisSpec = useCallback((visSpec: unknown) => {
        setVisSpec(visSpec);
    }, []);

    const handleActionLayout = (action: Action) => {
        console.log(action.type)
        if (
            action.type === Actions.ADJUST_BORDER_SPLIT
            || action.type === Actions.SELECT_TAB
        ) {
            setVisKey(prev => prev + 1);
        }
        return action;
    };

    const factory = (node: TabNode) => {
        const component = node.getComponent();
        if (component === FlexLayoutPanel.DATA_COLUMNS) {
            return (
                <Flex vertical gap={10} style={{ padding: '5px 20px' }}>
                    <Input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        type="text"
                        placeholder="Type to search columns..."
                        suffix={<SearchOutlined />}
                    />
                    <DataColumnsDnDList
                        columns={dataset.getColumsMapping().filter(column => column.name.includes(searchTerm))}
                        pull="clone"
                        put={false}
                        addCountOfRecords={CountOfRecordsColumn.name.includes(searchTerm)}
                    />
                </Flex>
            );
        }
        if (component === FlexLayoutPanel.VISUAL_CHANNELS) {
            return (
                <div style={{ padding: '5px 20px' }}>
                    <VisualizationMappingBuilder
                        visMapping={visMapping}
                        setVisMapping={setVisMapping}
                        dataset={dataset}
                    />
                </div>
            );
        }
        if (component === FlexLayoutPanel.MAIN_VISUALIZATION) {
            return (
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <InteractiveVisualizationButton onToggle={setInteractiveVisualization} />
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
                        isInteractive={interactiveVisualization}
                        onUpdateVis={handleChangeVisSpec}
                        key={visKey}
                    />
                </div>
            );
        }
        if (component === FlexLayoutPanel.VISUAL_SPEC) {
            return (
                <div style={{ height: '100%' }}>
                    <CodeMirror
                        value={JSON.stringify(omit(visSpec as object, ["data"]), null, 2)}
                        extensions={[json()]}
                    />
                </div>
            );
        }
    };

    return (
        <Flex vertical gap={8} justify="center" align="center" style={{ width: "100%", height: "100%", maxWidth: "80vw", maxHeight: "80vh", margin: "auto" }}>
            {
                dataset &&
                <Layout
                    model={layoutModel}
                    factory={factory}
                    onAction={handleActionLayout}
                />
            }
        </Flex>
    );
}