import { FC } from "react"
import styles from "./TextField.module.scss"
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";

interface TextFieldProps {
    register?: (name: string, options?: RegisterOptions) => UseFormRegisterReturn;
    label?: string,
    name?: string,
    postfix?: string,
    icon?: JSX.Element,
    onIconClick?: () => void,
    onInput?: (value?: string) => void,
    width?: number | string,
    type: "text" | "email" | "password"
}

const TextField: FC<TextFieldProps> = ({
    register = () => undefined,
    label,
    name = '',
    postfix,
    icon,
    onIconClick,
    onInput,
    width,
    type = "text",
}) => {
    const Icon = () => icon || <></>
    return <label
        className={styles["text-field"]}
        style={{ width: width }}
    >
        <input
            {...register(name)}
            placeholder={label}
            name={name}
            type={type}
            onInput={(event) => onInput?.(event.currentTarget.value)}
        />
        <div
            onClick={onIconClick}

        >
            <p>{postfix}</p>
            <Icon />
        </div>
    </label>
}

export default TextField