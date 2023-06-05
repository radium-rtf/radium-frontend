import {FC, MouseEventHandler} from "react"
import styles from "./Button.module.scss"

interface ButtonProps {
    label?: string,
    icon?: JSX.Element,
    style: "accent" | "destructive" | "outlined",
    width?: string | number,
    disabled?: boolean,
    onClick?: MouseEventHandler<HTMLDivElement>,
}

const Button: FC<ButtonProps> = ({
    label,
    icon,
    style = "outlined",
    width,
    disabled,
    onClick,
}) => <div
    className={styles[`${style}-button`]}
    onClick={onClick}
    style={{width: width}}
>
    {icon}
    {label && <label>{label}</label>}
</div>

export default Button