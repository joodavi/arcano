import { theme } from "antd";
import { ColumnType } from "../types/Dataset";
import config from "../types/Theme";

type DataTypeMetaData = {
    code: string;
    color: string;
} 

const token = theme.getDesignToken(config);

export const COLUMN_TYPE_TO_METADATA: Record<ColumnType, DataTypeMetaData> = {
	[ColumnType.CATEGORICAL]: {
		code: "C",
		color: token.categorical,
	},
	[ColumnType.ORDINAL]: {
		code: "O",
		color: token.ordinal,
	},
	[ColumnType.QUANTITATIVE]: {
		code: "Q",
		color: token.quantitative,
	},
	[ColumnType.TEMPORAL]: {
		code: "T",
		color: token.temporal,
	},
};
