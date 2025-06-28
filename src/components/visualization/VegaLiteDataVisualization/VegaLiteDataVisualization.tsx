import { useCallback, useEffect, useRef } from "react";
import { Fragment } from "react/jsx-runtime";
import type { Renderers } from "vega";
import type { EmbedOptions } from "vega-embed";
// import { VegaLiteVisHandler } from "../../../lib/visualization/VegaLite/VegaLiteVisHandler";
import { VegaLiteInteractiveVisHandler } from "../../../lib/visualization/VegaLite/VegaLiteInteractiveVisHandler";
import { VegaLiteInteractiveDataTypesToMark } from "../../../lib/visualization/VegaLite/VegaLiteInteractiveXYToMark";
import { VegaLiteVisHandler } from "../../../lib/visualization/VegaLite/VegaLiteVisHandler";
import { VegaLiteDataTypesToMark } from "../../../lib/visualization/VegaLite/VegaLiteXYToMark";
import type { DataVisualizationComponent } from "../../../types/Visualization";

export const VegaLiteDataVisualization: DataVisualizationComponent<EmbedOptions<string, Renderers>> = ({
    dataset,
    visMapping,
    visConfig,
    isInteractive,
    onUpdateVis
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const updateDataVisualization = useCallback(() => {
        const vegaLiteVisHandler = isInteractive
            ? new VegaLiteInteractiveVisHandler(VegaLiteInteractiveDataTypesToMark)
            : new VegaLiteVisHandler(VegaLiteDataTypesToMark);
        const visSpec = vegaLiteVisHandler.renderVis(dataset, visMapping, containerRef, visConfig);
        onUpdateVis?.(visSpec);
    }, [dataset, visMapping, visConfig, isInteractive, onUpdateVis]);

    useEffect(() => {
        updateDataVisualization();
    }, [updateDataVisualization]);

    return (
        <Fragment>
            <div ref={containerRef} style={{ width: '80%', height: '80%' }} />
        </Fragment>
    );
};