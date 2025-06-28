import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Modal, Typography } from "antd";
import DatasetListViewer from "../DatasetListViewer/DatasetListViewer";
import { Fragment, useState } from "react";
import DatasetLoader from "../DatasetLoader/DatasetLoader";

export default function MyDatasets() {
    const [openLoadDatasetModal, setOpenLoadDatasetModal] = useState<boolean>(false);

    return (
        <Fragment>
            <Flex vertical gap={8} justify="flex-start" align="start" style={{ height: '100%', width: '100%' }}>
                <Flex justify="space-between" align="center" style={{ width: '100%' }}>
                    <Typography.Title level={3}>My datasets</Typography.Title>
                    <Button
                        onClick={() => setOpenLoadDatasetModal(true)}
                        type="primary"
                        icon={<PlusOutlined />}
                    >
                        New dataset
                    </Button>
                </Flex>
                <DatasetListViewer />
            </Flex>

            <Modal
                open={openLoadDatasetModal}
                footer={null}
                onCancel={() => setOpenLoadDatasetModal(false)}
                destroyOnHidden
                width={{
                    xs: '90%',
                    sm: '80%',
                    md: '70%',
                    lg: '60%',
                    xl: '50%',
                    xxl: '40%',
                }}
            >
                <DatasetLoader onAddDataset={() => setOpenLoadDatasetModal(false)} />
            </Modal>
        </Fragment>
    );
}