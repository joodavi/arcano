import { Flex } from "antd";
import MyDatasets from "../components/data/MyDatasets/MyDatasets";

export default function Home() {
    return (
        <Flex align="start" style={{ height: '100%', padding: '0px 40px' }}>
            <MyDatasets />
        </Flex>
    );
}