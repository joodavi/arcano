import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

type LoadFileInputProps = {
    onFileLoad: (file: File, fileContent: string) => void;
};

export default function LoadFileInput({ onFileLoad }: LoadFileInputProps) {
    const [fileName, setFileName] = useState<string | null>(null);

    useEffect(() => {
        return () => {
            setFileName(null);
        };
    }, []);

    const handleFileChange = (file: File) => {
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result;
                onFileLoad(file, content as string);
            };
            reader.readAsText(file);
        }
    };

    return (
        <Upload maxCount={1} defaultFileList={[]} type="drag" showUploadList={false} beforeUpload={handleFileChange}>
            <Button type="primary" icon={<UploadOutlined />}>{fileName ? fileName : 'Load a CSV file'}</Button>
        </Upload>
    );
}