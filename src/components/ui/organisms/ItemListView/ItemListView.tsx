import { Empty, Flex } from "antd";
import { type FC, Fragment } from "react";

export interface ItemListViewProps<T> {
    items: Array<T>;
    showItemComponent: FC<{ item: T; }>;
    emptyMessage?: string;
};

export default function ItemListView<T>({
    items,
    showItemComponent: ShowItemComponent,
    emptyMessage = "No data"
}: ItemListViewProps<T>) {
    return (
        <Fragment>
            {
                items.length > 0 ?
                    <Flex gap={10} align="center" justify="space-between">
                        {
                            items.map((item, index) => <ShowItemComponent item={item} key={index} />)
                        }
                    </Flex> :
                    <Flex gap={10} vertical align="center" justify="center" style={{ height: '100%', width: '100%' }}>
                        <Empty 
                            image={Empty.PRESENTED_IMAGE_SIMPLE} 
                            description={emptyMessage}
                        />
                    </Flex>
            }
        </Fragment>
    );

}