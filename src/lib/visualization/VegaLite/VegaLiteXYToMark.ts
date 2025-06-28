
export const VegaLiteDataTypesToMark: Record<
	string,
	Array<{mark: string, encoding?: Record<string, unknown>}>
> = {
	"|": [],
	// 1x
	"nominal|": [
		{
			mark: "text",
		},
	],
	"|nominal": [
		{
			mark: "text",
		},
	],
	"ordinal|": [
		{
			mark: "text",
		},
	],
	"|ordinal": [
		{
			mark: "text",
		},
	],
	"temporal|": [
		{
			mark: "text",
		},
	],
	"|temporal": [
		{
			mark: "text",
		},
	],
	"quantitative|": [
		{
			mark: "point",
		},
	],
	"|quantitative": [
		{
			mark: "point",
		},
	],
	"f_quantitative|": [
		{
			mark: "bar",
		},
	],
	"|f_quantitative": [
		{
			mark: "bar",
		},
	],

	// 2x
	// x: nominal
	"nominal|nominal": [
		{
			mark: "rect",
		},
	],
	"nominal|ordinal": [
		{
			mark: "rect",
		},
	],
	"nominal|temporal": [
		{
			mark: "rect",
		},
	],
	"nominal|quantitative": [
		{
			mark: "tick",
		},
	],
	"nominal|f_quantitative": [
		{
			mark: "bar",
		},
	],

	// x: ordinal
	"ordinal|nominal": [
		{
			mark: "rect",
		},
	],
	"ordinal|ordinal": [
		{
			mark: "rect",
		},
	],
	"ordinal|temporal": [
		{
			mark: "rect",
		},
	],
	"ordinal|quantitative": [
		{
			mark: "tick",
		},
	],
	"ordinal|f_quantitative": [
		{
			mark: "bar",
		},
	],

	// x: temporal
	"temporal|nominal": [
		{
			mark: "rect",
		},
	],
	"temporal|ordinal": [
		{
			mark: "rect",
		},
	],
	"temporal|temporal": [
		{
			mark: "rect",
		},
	],
	"temporal|quantitative": [
		{
			mark: "tick",
		},
	],
	"temporal|f_quantitative": [
		{
			mark: "line",
		},
	],

	// x: quantitative
	"quantitative|nominal": [
		{
			mark: "point",
		},
	],
	"f_quantitative|nominal": [
		{
			mark: "bar",
		},
	],
	"quantitative|ordinal": [
		{
			mark: "tick",
		},
	],
	"f_quantitative|ordinal": [
		{
			mark: "bar",
		},
	],
	"quantitative|temporal": [
		{
			mark: "line",
		},
	],
	"f_quantitative|temporal": [
		{
			mark: "line",
		},
	],
	"quantitative|quantitative": [
		{
			mark: "point",
		},
	],
	"f_quantitative|quantitative": [
		{
			mark: "bar",
		},
	],
	"quantitative|f_quantitative": [
		{
			mark: "bar",
		},
	],
	"f_quantitative|f_quantitative": [
		{
			mark: "point",
		},
	],
};
