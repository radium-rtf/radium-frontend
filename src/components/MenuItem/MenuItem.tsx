import {FC} from "react"
import styles from "./MenuItem.module.scss"

interface MenuItemProps {
    icon?: JSX.Element,
    iconSize: "small" | "large"
    label?: string,
    onClick?: () => void,
}

const MenuItem: FC<MenuItemProps> = ({
    icon,
    iconSize = "small",
    label,
    onClick,
}) => <div
    className={styles[`menu-item-${iconSize}`]}
    onClick={onClick}
>
    {icon}
    <label>{label}</label>
</div>

export default MenuItem