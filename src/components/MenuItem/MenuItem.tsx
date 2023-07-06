import {CSSProperties, FC} from "react"
import styles from "./MenuItem.module.scss"

interface MenuItemProps {
    icon?: JSX.Element,
    iconSize: "small" | "large"
    label?: string,
    onClick?: () => void,
    style?: CSSProperties,
}

const MenuItem: FC<MenuItemProps> = ({
    icon,
    iconSize = "small",
    label,
    onClick,
    style,
}) => <div
    className={styles[`menu-item-${iconSize}`]}
    onClick={onClick}
    style={style}
>
    {icon}
    <div style={{width: 16}} />
    <label>{label}</label>
</div>

export default MenuItem