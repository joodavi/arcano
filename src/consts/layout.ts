import type { IJsonModel } from "flexlayout-react";

export const FlexLayoutPanel = {
	DATA_COLUMNS: "datacolumns",
	VISUAL_CHANNELS: "visualchannels",
	VISUAL_SPEC: "visualspec",
	MAIN_VISUALIZATION: "mainvisualization",
};

export const FLEX_LAYOUT_CONFIG: IJsonModel = {
	global: {},
	borders: [],
	layout: {
		type: "row",
		children: [
			{
				type: "row",
				weight: 20,
				children: [
					{
						type: "tabset",
						enableMaximize: false,
						children: [
							{
								type: "tab",
								name: "Data columns",
								component: FlexLayoutPanel.DATA_COLUMNS,
								enableClose: false,
								enableRename: false,
							},
						],
					},
					{
						type: "tabset",
						enableMaximize: false,
						children: [
							{
								type: "tab",
								name: "Visual channels",
								component: FlexLayoutPanel.VISUAL_CHANNELS,
								enableClose: false,
								enableRename: false,
							},
						],
					},
				],
			},
			{
				type: "tabset",
				weight: 80,
				children: [
					{
						type: "tab",
						name: "Main visualization",
						component: FlexLayoutPanel.MAIN_VISUALIZATION,
						enableClose: false,
						enableRename: false,
					},
				],
			},
		],
	},
};

export const FLEX_LAYOUT_BORDER_CONFIG: IJsonModel = {
	global: {},
	borders: [
		{
			type: "border",
			location: "left",
			autoSelectTabWhenOpen: true,
			selected: 0,
			children: [
				{
					type: "tab",
					name: "Visual channels",
					component: FlexLayoutPanel.VISUAL_CHANNELS,
					enableClose: false,
					enableRename: false,
					minWidth: 300,
				},
				{
					type: "tab",
					name: "Data columns",
					component: FlexLayoutPanel.DATA_COLUMNS,
					enableClose: false,
					enableRename: false,
					minWidth: 300
				},
				{
					type: "tab",
					name: "Visual spec",
					component: FlexLayoutPanel.VISUAL_SPEC,
					enableClose: false,
					enableRename: false,
					minWidth: 300,
				},
			],
		},
	],
	layout: {
		type: "row",
		children: [
			{
				type: "tabset",
				weight: 80,
				children: [
					{
						type: "tab",
						name: "Main visualization",
						component: FlexLayoutPanel.MAIN_VISUALIZATION,
						enableClose: false,
						enableRename: false,
					},
				],
			},
		],
	},
};

