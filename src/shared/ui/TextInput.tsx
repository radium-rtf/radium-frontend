'use client'
import { ChangeEventHandler, FC, ReactNode, useState } from "react";
import { cn } from "../utils/cn";

interface TextInputProps {
    defaultValue?: string
    disabled?: boolean,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    children?: ReactNode
}

export const TextInput: FC<TextInputProps> = ({ defaultValue, disabled, onChange, children }: TextInputProps) => {
    const [hasText, setHasText] = useState(false);

    return <div className="w-64 text-sm justify-end flex text-text-secondary">
        <input
            defaultValue={defaultValue}
            onChange={e => {
                setHasText(true);
                onChange?.(e);
            }}
            disabled={disabled}
            className={cn(
                "my-auto w-64 p-1 h-9 text-start overflow-hidden bg-green-300 border-grey-300 bg-transparent leading-tight border rounded-lg resize-none",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "hover:bg-white hover: hover:bg-opacity-5",
                "active:bg-black active:focus-visible:bg-opacity-10 active:outline-none",
                "focus-visible:outline-1 focus-visible:outline-white focus-visible:outline-offset-0",
                "focus-visible:bg-white hover: focus-visible:bg-opacity-5",
                { "text-text-primary": hasText }
            )}>
        </input>
        <div className="fixed flex align-middle gap-4 my-2 mr-2">
            {children}
        </div>
    </div >
}