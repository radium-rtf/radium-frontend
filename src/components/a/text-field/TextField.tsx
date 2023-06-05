import {FC} from "react"
import styles from "./TextField.module.scss"

interface TextFieldProps {
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
    label,
    name,
    postfix,
    icon,
    onIconClick,
    onInput,
    width,
    type,
}) => {
    const Icon = () => icon || <></>
    return <label className={styles["text-field"]}>
        <input
            style={{width: width}}
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