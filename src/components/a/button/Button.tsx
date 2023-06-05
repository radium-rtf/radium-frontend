import {FC} from "react"
import styles from "./Button.module.scss"

interface ButtonProps {
    label?: string,
    icon?: FC,
    style: "accent" | "destructive" | "outlined",
    width?: string | number,
    disabled?: boolean,
    onClick?: () => void,
}

const Button: FC<ButtonProps> = ({
    label,
    icon,
    style = "outlined",
    width,
    disabled,
    onClick,
}) => {
    const Icon = icon ? icon : () => <></>
    return <div
        className={styles[`${style}-button`]}
        onClick={onClick}
        style={{width: width}}
    >
        <Icon />
        <label>{label}</label>
    </div>
}

export default Button