import { Flex } from "antd";
import MyVisualizations from "../components/visualization/MyVisualizations/MyVisualizations";

export default function VisualizationManager() {
    return (
        <Flex align="start" style={{ height: '100%', padding: '0px 40px' }}>
            <MyVisualizations />
        </Flex>
    );
}