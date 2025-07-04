import type { Renderers } from "vega";
import type { EmbedOptions } from "vega-embed";
import type { TopLevelSpec } from "vega-lite"

// This file initializes the visualization with initial Vega-Lite properties.


export const VegaLiteEmptyVis: TopLevelSpec = {
	width: "container",
    height: "container",
	data: {
		values: [{"X":0,"Y":0, "T":"arcano"}]
	},
	mark: {
		type: "text",
		fontSize: 40,
		fontWeight: "lighter",
	},
	encoding: {
		x: {field: "X", type: "quantitative"},
		y: {field: "Y", type: "quantitative"},
		text: {field: "T", type: "nominal"}
	},
}

export const VegaLiteSimpleViewConfig: EmbedOptions<string, Renderers> = {}

export const VegaLiteDefaultViewConfig: EmbedOptions<string, Renderers> = {
	actions: false
}