import {FC, MouseEventHandler} from "react"
import styles from "./Button.module.scss"

interface ButtonProps {
    label?: string,
    icon?: JSX.Element,
    color?: "accent" | "destructive" | "outlined",
    type?: "button" | "submit" | "reset"
    width?: string | number,
    disabled?: boolean,
    onClick?: MouseEventHandler<HTMLButtonElement>,
}

const Button: FC<ButtonProps> = ({
    label,
    icon,
    color = "outlined",
    type,
    width,
    disabled,
    onClick,
}) => <button
    className={styles[`${color}-button`]}
    onClick={onClick}
    type={type}
    style={{width: width}}
    disabled={disabled}
>
    {icon}
    {label && <label>{label}</label>}
</button>

export default Button;