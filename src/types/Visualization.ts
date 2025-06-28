import type { FC } from "react";
import { ColumnType, type Column, type DataRows, type Dataset } from "./Dataset";

export type ColumnMapping = Omit<Column, "data">

export const CountOfRecordsColumn: ColumnMapping = {
	id: "#count-of-records",
	name: "# count of records",
	type: ColumnType.QUANTITATIVE,
	description: "count of records",
	options: {
		aggregationFunction: {
			name: "count",
			function: (values: Array<number>) => values.length,
		}
	}
}

export interface VisMapping {
	xAxis: Array<ColumnMapping>;
	yAxis: Array<ColumnMapping>;
	color: Array<ColumnMapping>;
	size: Array<ColumnMapping>;
}

export const generateEmptyVisMappgin = (dataRows: DataRows) => {
	return ({
		dataRows: dataRows,
		xAxis: [],
		yAxis: [],
		color: [],
		size: [],
	})
};

export type DataVisualizationComponent<T> = FC<{
	dataset: Dataset;
	visMapping: VisMapping;
	visConfig: T;
	isInteractive: boolean;
	onUpdateVis?: (visSpec: unknown) => void;
}>;

export interface Visualization {
	id: string;
	name: string;
	datasetId: string;
	visMapping: VisMapping;
}
