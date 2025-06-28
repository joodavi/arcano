import type { ThemeConfig } from "antd";

declare module "antd/es/theme/interface" {
	interface SeedToken {
		quantitative: string;
		ordinal: string;
		categorical: string;
		temporal: string;
	}
}

const config: ThemeConfig = {
	token: {
		colorPrimary: "#CA662C",
		colorInfo: "#CA662C",
		colorError: "#C00F0C",
		fontSize: 14,
		colorTextDisabled: "#C0C0C0",
		colorTextHeading: "#CA662C",
		colorBgBase: "#FFFFFF",
		colorBgLayout: "#F0EEE7",
		colorBgContainerDisabled: "#EFEFEF",
		colorBgContainer: "#FCFCFC",
		// custom colors for data type (quantitative, ordinal, categorical, temporal)
		quantitative: "#D01C20",
		ordinal: "#53358B",
		categorical: "#2870AA",
		temporal: "#FCA55E",
	},
	components: {
		Layout: {
			headerBg: "#FFFFFF",
		},
		Card: {
			colorTextHeading: "#CA662C",
			colorBorderSecondary: "#D9D9D9",
			fontWeightStrong: 700,
		},
		Table: {
			borderColor: "#D9D9D9",
			headerColor: "#404040",
			headerBg: "#FAFAFA00",
			headerSplitColor: "#FAFAFA00",
			rowHoverBg: "#FAFAFA00",
			colorText: "#404040",
			colorTextHeading: "#404040",
			lineType: "none",
		},
	},
};

export default config;
