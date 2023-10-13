'use client'
import { FC } from "react";
import { Icon } from "./Icon";

interface IProps {
    fileName: string;
    fileHref: string;
    className?: string
}

export const DownloadButton: FC<IProps> = ({
    fileName,
    fileHref,
    className = "w-6 h-6 p-1 hover:bg-text-primary hover:bg-opacity-10" }) => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.download = fileName;
        link.href = fileHref;
        link.click();
    };

    return (<button onClick={handleDownload}>
        <Icon
            className={className}
            type={'download'} />
    </button>);
}