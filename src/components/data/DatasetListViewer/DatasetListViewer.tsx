import useDatasets from "../../../stores/dataset";
import ItemListView from "../../ui/organisms/ItemListView/ItemListView";
import DatasetCard from "../DatasetCard/DatasetCard";

export default function DatasetListViewer() {
    const { datasets } = useDatasets();
    return <ItemListView items={datasets} showItemComponent={DatasetCard} emptyMessage="No datasets loaded..." />;
}