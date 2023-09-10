import React, { ChangeEventHandler } from "react";
import { FC } from "react";
import { cn } from "../utils/cn";

interface TextAreaProps {
    defaultValue?: string,
    hasText: boolean,
    className?: string,
    onChange?: ChangeEventHandler<HTMLTextAreaElement>,
    disabled?: boolean,
}

export const TextArea: FC<TextAreaProps> = ({
    defaultValue,
    hasText,
    className,
    onChange,
    disabled }) => (
    <textarea
        onChange={onChange}
        disabled={disabled}
        defaultValue={defaultValue}
        className={cn(
            className,
            "p-4 w-64 h-32 bg-green-300 border-grey-300 bg-transparent leading-tight border rounded-lg resize-none text-text-secondary outline-none",
            { "text-text-primary": hasText },
            "disabled:cursor-not-allowed disabled:opacity-50",
            "hover:bg-white hover: hover:bg-opacity-5",
            "active:bg-black active:focus-visible:bg-opacity-10 active:outline-none",
            "focus-visible:outline-1 focus-visible:outline-white focus-visible:outline-offset-0",
            "focus-visible:bg-white hover: focus-visible:bg-opacity-5"
        )}
    />
);