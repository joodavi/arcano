import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Visualization } from "../types/Visualization";

type VisualizationsState = {
	visualizations: Array<Visualization>;
	addVisualization: (visualization: Visualization) => void;
	removeVisualization: (id: string) => void;
	removeVisualizationFromDataset: (id: string) => void;
	updateVisualization: (id: string, updatedVisualization: Visualization) => void;
};

const STORAGE_NAME = "visualizations-storage";

const useVisualizations = create<VisualizationsState>()(
	persist(
		(set, get) => ({
			visualizations: [],
			addVisualization: (visualization: Visualization) =>
				set({ visualizations: [...get().visualizations, visualization] }),
			removeVisualization: (id: string) => {
				const visIndex = get().visualizations.findIndex((vis) => vis.id === id);
				const currendVis = [...get().visualizations];
				if (visIndex >= 0) {
					currendVis.splice(visIndex, 1);
				}
				set({ visualizations: currendVis });
			},
			removeVisualizationFromDataset: (id: string) => {
				const visIdsToRemove = get().visualizations.filter(vis => vis.datasetId === id).map(vis => vis.id);
				for(const id of visIdsToRemove) {
					get().removeVisualization(id);
				}
			},
			updateVisualization: (id: string, updatedVisualization: Visualization) => {
				const visIndex = get().visualizations.findIndex((vis) => vis.id === id);
				const currendVis = [...get().visualizations];
				if (visIndex >= 0) {
					currendVis[visIndex] = updatedVisualization;
				}
				set({ visualizations: currendVis });
			},
		}),
		{
			name: STORAGE_NAME,
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export default useVisualizations;
