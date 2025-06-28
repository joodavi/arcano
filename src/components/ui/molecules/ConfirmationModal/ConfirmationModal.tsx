import { Modal } from "antd";
import type { ReactNode } from "react";

interface ConfirmationModalProps {
    open: boolean;
    title: string;
    children: ReactNode;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmationModal({ 
    open,
    title,
    children,
    onConfirm, 
    onCancel,
}: ConfirmationModalProps) {
    return (
        <Modal
            title={title}
            open={open}
            onOk={onConfirm}
            onCancel={onCancel}
        >
            {children}
        </Modal>
    )
}