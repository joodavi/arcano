import type { Dataset } from "../../../types/Dataset";
import type { DataVisualizationComponent, VisMapping } from "../../../types/Visualization";

type MainVisualizationProps<T> = {
    dataset: Dataset;
    visMapping: VisMapping;
    visConfig: T;
    visualizationComponent: DataVisualizationComponent<T>;
    isInteractive: boolean;
    onUpdateVis?: (visSpec: unknown) => void;
};

export default function MainVisualization<T>({
    dataset,
    visMapping,
    visConfig,
    visualizationComponent: VisualizationComponent,
    isInteractive,
    onUpdateVis
}: MainVisualizationProps<T>) {
    return <VisualizationComponent
        dataset={dataset}
        visMapping={visMapping}
        visConfig={visConfig}
        isInteractive={isInteractive}
        onUpdateVis={onUpdateVis}
    />;
}