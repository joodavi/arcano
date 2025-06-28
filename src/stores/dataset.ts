import { create } from "zustand";
import { Dataset, type DatasetJSON } from "../types/Dataset";
import { persist, createJSONStorage } from "zustand/middleware";

type DatasetJSONState = {
	datasets: Array<DatasetJSON>;
	addDataset: (dataset: Dataset) => void;
	getDatasetById: (id: string) => Dataset | null;
	removeDataset: (id: string) => void;
	updateDataset: (id: string, updatedDataset: Dataset) => void;
}

type DatasetState = {
	datasets: Array<Dataset>;
	addDataset: (dataset: Dataset) => void;
	getDatasetById: (id: string) => Dataset | null;
	removeDataset: (id: string) => void;
	updateDataset: (id: string, updatedDataset: Dataset) => void;
};

const STORAGE_NAME = 'datasets-storage';

const useDatasets = create<DatasetState>()(
	persist(
		(set, get) => ({
			datasets: [],
			addDataset: (dataset: Dataset) =>
				set({ datasets: [...get().datasets, dataset] }),
			getDatasetById: (id: string): Dataset | null => {
				return get().datasets.find(
					(ds) => ds.getId() === id,
				) ?? null;
			},
			removeDataset: (id: string) => {
				const datasetIndex = get().datasets.findIndex(
					(ds) => ds.getId() === id,
				);
				const currendDatasets = [...get().datasets];
				if (datasetIndex >= 0) {
					currendDatasets.splice(datasetIndex, 1);
				}
				set({ datasets: currendDatasets });
			},
			updateDataset: (id: string, updatedDataset: Dataset) => {
				const datasetIndex = get().datasets.findIndex(
					(ds) => ds.getId() === id,
				);
				const currendDatasets = [...get().datasets];
				if (datasetIndex > 0) {
					currendDatasets[datasetIndex] = updatedDataset;
				}
				set({ datasets: currendDatasets });
			},
		}),
		{
			name: STORAGE_NAME,
			storage: createJSONStorage(() => localStorage),	
			merge: (persisted: unknown, current: DatasetState) => {
				current.datasets = (persisted as DatasetJSONState).datasets?.map((dataset: DatasetJSON) => Dataset.fromJSON(dataset))
				return current;
			}		
		}
	),
);

export default useDatasets;
