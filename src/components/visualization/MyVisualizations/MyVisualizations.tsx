import { Flex, Typography } from "antd";
import VisualizationListView from "../VisualizationsListView/VisualizationsListView";

export default function MyVisualizations() {
    return (
        <Flex vertical gap={8} justify="flex-start" align="start" style={{ height: '100%', width: '100%' }}>
            <Flex justify="space-between" align="center" style={{ width: '100%' }}>
                <Typography.Title level={3}>My visualizations</Typography.Title>
            </Flex>
            <VisualizationListView />
        </Flex>
    );
}