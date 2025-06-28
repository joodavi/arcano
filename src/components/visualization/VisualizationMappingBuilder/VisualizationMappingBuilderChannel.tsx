import { Flex, Typography } from "antd";
import type { ReactNode } from "react";

interface VisualizationMappingChannelFieldProps {
    text: string;
    children: ReactNode;
}

export default function VisualizationMappingChannelField({ text, children }: VisualizationMappingChannelFieldProps) {
    return (
        <Flex vertical>
            <Typography.Text style={{ fontWeight: 500 }}>{text}</Typography.Text>
            {children}
        </Flex>
    );
}