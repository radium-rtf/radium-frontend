import {CSSProperties, FC, MouseEventHandler, ReactNode} from "react"
import styles from "./Card.module.scss"

interface CardProps {
    children?: ReactNode,
    onClick?: MouseEventHandler<HTMLDivElement>,
    style?: CSSProperties,
}

const Card: FC<CardProps> = ({children, onClick, style}) => {
    const className = onClick ? "clickable-card" : "card"
    return <div
        className={styles[className]}
        style={style}
        onClick={onClick}
        children={children}
    />
}

export default Card;