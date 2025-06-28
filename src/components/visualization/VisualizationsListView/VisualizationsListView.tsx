import useVisualizations from "../../../stores/visualizations";
import ItemListView from "../../ui/organisms/ItemListView/ItemListView";
import VisualizationCard from "../VisualizationCard/VisualizationCard";

export default function VisualizationListView() {
    const { visualizations } = useVisualizations();
    return <ItemListView items={visualizations} showItemComponent={VisualizationCard} emptyMessage="No visualizations created..." />
}