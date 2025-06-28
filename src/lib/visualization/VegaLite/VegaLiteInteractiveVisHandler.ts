import type { RefObject } from "react";
import type { Renderers } from "vega";
import embed, { type EmbedOptions } from "vega-embed";
import type { TopLevelSpec } from "vega-lite";
import type { Column, Dataset } from "../../../types/Dataset";
import type { VisMapping } from "../../../types/Visualization";
import VisHandler from "../VisualizationHandler";
import { VegaLiteEmptyVis } from "./VegaLiteConsts";

const conlumnTypeToVegaType: Record<Column["type"], string> = {
    categorical: "nominal",
    ordinal: "ordinal",
    quantitative: "quantitative",
    temporal: "temporal",
};

export class VegaLiteInteractiveVisHandler extends VisHandler {
    private mapXYToVegaMark: Record<
        string,
        Array<{ mark: unknown; encoding?: Record<string, unknown>, params?: Array<unknown> }>
    >;

    constructor(
        mapXYToVegaMark: Record<
            string,
            Array<{ mark: unknown; encoding?: Record<string, unknown>, params?: Array<unknown> }>
        >,
    ) {
        super();
        this.mapXYToVegaMark = mapXYToVegaMark;
    }

    private visMappingToStringXY(visMapping: VisMapping): string {
        let xAxisStr = "";
        let yAxisStr = "";

        // if there was a column in x-axis
        if (visMapping.xAxis.length > 0) {
            // xAxisStr = vega-lite type of this column
            xAxisStr = conlumnTypeToVegaType[visMapping.xAxis[0].type];
            // if there was an aggregation function applyed to this column
            if (visMapping.xAxis[0].options?.aggregationFunction?.function) {
                // xAxisStr receives the "f_" prefix to indicate that
                xAxisStr = `f_${xAxisStr}`;
            }
        }

        // if there was a column in y-axis
        if (visMapping.yAxis.length > 0) {
            // yAxisStr = vega-lite type of this column
            yAxisStr = conlumnTypeToVegaType[visMapping.yAxis[0].type];
            // if there was an aggregation function applyed to this column
            if (visMapping.yAxis[0].options?.aggregationFunction?.function) {
                // yAxisStr receives the "f_" prefix to indicate that
                yAxisStr = `f_${yAxisStr}`;
            }
        }

        // returns a string in formate "<x-axis type>|<y-axis type>"
        // that matches with the "VegaLiteXYToMark" keys
        return `${xAxisStr}|${yAxisStr}`;
    }

    private defineMarkFromVisualizationMapping(
        visMapping: VisMapping,
    ): Array<{ mark: unknown; encoding?: Record<string, unknown>, params?: Array<unknown> }> {
        return this.mapXYToVegaMark[this.visMappingToStringXY(visMapping)] ?? [];
    }

    protected constructVisSpec(
        dataset: Dataset,
        visMapping: VisMapping,
    ): TopLevelSpec {
        const visSpec = this.defineMarkFromVisualizationMapping(visMapping);
        if (visSpec.length > 0) {
            const encoding: Record<
                string,
                { field: string; type: string; aggregate?: string }
            > = {};

            if (visMapping.xAxis.length > 0) {
                encoding.x = {
                    field: visMapping.xAxis[0].id,
                    type: conlumnTypeToVegaType[visMapping.xAxis[0].type],
                    aggregate: visMapping.xAxis[0].options?.aggregationFunction?.name,
                };
                // to-do: estudar Vega-lite x2
                // if (visMapping.xAxis.length > 1) {
                // 	encoding.x2 = {
                // 		field: visMapping.xAxis[1].id,
                // 		type: conlumnTypeToVegaType[visMapping.xAxis[1].type],
                // 		aggregate: visMapping.xAxis[0].options?.aggregationFunction?.name,
                // 	};
                // }
            }
            if (visMapping.yAxis.length > 0) {
                encoding.y = {
                    field: visMapping.yAxis[0].id,
                    type: conlumnTypeToVegaType[visMapping.yAxis[0].type],
                    aggregate: visMapping.yAxis[0].options?.aggregationFunction?.name,
                };
                // to-do: estudar Vega-lite y2
                // if (visMapping.yAxis.length > 1) {
                // 	encoding.y2 = {
                // 		field: visMapping.yAxis[1].id,
                // 		type: conlumnTypeToVegaType[visMapping.yAxis[1].type],
                // 		aggregate: visMapping.yAxis[0].options?.aggregationFunction?.name,
                // 	};
                // }
            }
            if (visMapping.color.length > 0) {
                encoding.color = {
                    field: visMapping.color[0].id,
                    type: conlumnTypeToVegaType[visMapping.color[0].type],
                    aggregate: visMapping.color[0].options?.aggregationFunction?.name,
                };
            }
            if (visMapping.size.length > 0) {
                encoding.size = {
                    field: visMapping.size[0].id,
                    type: conlumnTypeToVegaType[visMapping.size[0].type],
                    aggregate: visMapping.size[0].options?.aggregationFunction?.name,
                };
            }
            return {
                $schema: "https://vega.github.io/schema/vega-lite/v6.json",
                data: {
                    values: dataset.getRows(),
                },
                background: "inherit",
                // view: { fill: "inherit" }, //retirado para funcionar zoom/moving
                width: "container",
                height: "container",
                params: visSpec?.[0]?.params,
                encoding: { ...encoding, ...visSpec?.[0]?.encoding },
                mark: visSpec?.[0]?.mark,
            } as TopLevelSpec;
        }

        return VegaLiteEmptyVis;
    }

    public renderVis(
        dataset: Dataset,
        visMapping: VisMapping,
        containerRef: RefObject<HTMLDivElement | null>,
        config?: EmbedOptions<string, Renderers>,
    ): TopLevelSpec | null {
        if (containerRef?.current) {
            const vegaSpec = this.constructVisSpec(dataset, visMapping);
            embed(containerRef.current, vegaSpec, config);
            return vegaSpec;
        }
        return null;
    }
}
