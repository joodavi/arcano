import type { ColumnMapping } from "./Visualization";

export type CsvLoadOptions = {
	delimiter?: string;
	hasHeader?: boolean;
	encoding?: string;
};

export type AggregationFunction<DataValueType> = {
	name: string;
	function?: (values: Array<DataValueType>) => DataValueType;
};

export type QuantitativeAgregationFunction = AggregationFunction<number>;

export const QuantitativeAgregationFunctions: {[key: string]: QuantitativeAgregationFunction} = {
	NONE: {
		name: "none"
	},
	MEAN: {
		name: "mean",
		function: (values: Array<number>) =>
			values.reduce((sum: number, num: number) => sum + num, 0) / values.length,
	},
	SUM: { 
		name: "sum", 
		function: (values: Array<number>) => values.reduce((sum: number, num: number) => sum + num, 0), 
	},
	MAX: { 
		name: "max", 
		function: (values: Array<number>) => Math.max(...values), 
	},
	MIN: { 
		name: "min", 
		function: (values: Array<number>) => Math.min(...values), 
	},
} as const;

export type QuantitativeAgregationFunctions =
	(typeof QuantitativeAgregationFunctions)[keyof typeof QuantitativeAgregationFunctions];

export type DataValueType = number | string | Date;

export const ColumnType = {
	QUANTITATIVE: "quantitative",
	CATEGORICAL: "categorical",
	TEMPORAL: "temporal",
	ORDINAL: "ordinal",
} as const;

export type ColumnType = (typeof ColumnType)[keyof typeof ColumnType];

export interface ColumnOptions {
	aggregationFunction?: QuantitativeAgregationFunction;
}

export type Column = {
	id: string;
	name: string;
	type: ColumnType;
	description?: string;
	data: Array<DataValueType>;
	options?: ColumnOptions;
};

export type DataRows = Array<Record<string, DataValueType>>;

export interface DatasetJSON {
	id: string;
	name: string;
	description?: string;
	originalContent: string;
	headers: Array<string>;
	rows: DataRows;
	columns: Array<Column>;
}

export class Dataset {
	private id: string;
	private name: string;
	private description?: string;
	private originalContent: string;
	private headers: Array<string>;
	private rows: DataRows;
	private columns: Array<Column>;
	
	constructor(
		csvContent: string,
		name: string,
		id?: string,
		description?: string,
	) {
		this.name = name;
		this.id = id ?? crypto.randomUUID();
		this.description = description ?? "";
		this.originalContent = csvContent;
		const { headers, rows, columns } = this.fromCSVContent(csvContent);
		this.headers = headers;
		this.rows = rows;
		this.columns = columns;
	}

	private fromCSVContent(
		csvContent: string,
		csvOptions?: CsvLoadOptions,
	): {
		headers: Array<string>;
		rows: Array<Record<string, DataValueType>>;
		columns: Array<Column>;
	} {
		const delimiter = csvOptions?.delimiter ?? ",";
		const hasHeader = csvOptions?.hasHeader ?? true;

		const lines = csvContent
			.split("\n")
			.map((line) => line.trim())
			.filter((line) => line.length > 0);

		const headers = hasHeader
			? lines[0].split(delimiter).map((header) => header.trim())
			: [];

		const rowsList = lines
			.slice(hasHeader ? 1 : 0)
			.map((line) => line.split(delimiter).map((value) => value.trim()));

		const columns: Column[] = headers.map((header, index) => {
			const typeValue = rowsList.some((row) => Number.isNaN(Number(row[index])))
				? ColumnType.CATEGORICAL
				: ColumnType.QUANTITATIVE;
			return {
				id: header.toLocaleLowerCase().replace(/ /g, "_"),
				name: header,
				type: typeValue,
				data: rowsList.map((row) =>
					typeValue === "quantitative" ? Number(row[index]) : row[index],
				),
			};
		});

		const rows: Array<Record<string, DataValueType>> = rowsList.map(
			(_, rowIndex) =>
				Object.fromEntries(
					columns.map((column) => [column.id, column.data[rowIndex]]),
				),
		);

		return {
			headers: headers ?? [],
			rows: rows ?? [],
			columns: columns ?? [],
		};
	}

	public getId() {
		return this.id;
	}

	public getName() {
		return this.name;
	}

	public setName(name: string) {
		this.name = name;
	}

	public getDescription(): string {
		return this.description ?? "";
	}

	public setDescription(description: string) {
		this.description = description;
	}

	public getOriginalContent() {
		return this.originalContent;
	}

	public getHeaders() {
		return this.headers;
	}

	public getRows(): DataRows {
		return this.rows;
	}

	public getColumns() {
		return this.columns;
	}

	public getColumsMapping() {
		return this.columns.map(col => ({
			id: col.id,
			name: col.name,
			type: col.type,
			description: col.description,
			options: col.options
		} as ColumnMapping));
	}

	public getUniqueTypes(): string {
		const types = this.columns.map(({ type }) => type);
		return [...new Set(types)].join(", ");
	}

	public changeColumnType(columnId: string, newType: Column["type"]) {
		const updatedColumns = this.columns.map((column) => {
			if (column.id === columnId) {
				if (newType === ColumnType.QUANTITATIVE) {
					for (const value of column.data) {
						if (Number.isNaN(Number(value))) {
							throw new Error(`Cannot convert value "${value}" to ${newType}.`);
						}
					}
				} else if (newType === ColumnType.TEMPORAL) {
					for (const value of column.data) {
						if (
							new Date(Date.parse(value.toString())).toString() ===
							"Invalid Date"
						) {
							throw new Error(`Cannot convert value "${value}" to ${newType}.`);
						}
					}
				}

				try {
					return {
						...column,
						type: newType,
						data: column.data.map((value) => {
							if (newType === ColumnType.QUANTITATIVE) {
								return Number(value);
							}
							if (
								newType === ColumnType.CATEGORICAL ||
								newType === ColumnType.ORDINAL
							) {
								return String(value);
							}
							if (newType === ColumnType.TEMPORAL) {
								return new Date(value);
							}
							return value;
						}),
					};
				} catch (error) {
					console.error(`Error changing column type: ${error}`);
					return column; // Return the original column if conversion fails
				}
			}
			return column;
		});
		this.columns = updatedColumns;
	}

	public toJSON(): DatasetJSON {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			originalContent: this.originalContent,
			headers: this.headers,
			rows: this.rows,
			columns: this.columns,
		};
	}

	public static fromJSON(datasetJSON: DatasetJSON) {
		return new Dataset(
			datasetJSON.originalContent,
			datasetJSON.name,
			datasetJSON.id,
			datasetJSON.description,
		);
	}
}
