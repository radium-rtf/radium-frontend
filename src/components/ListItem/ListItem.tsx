import {FC, FormEventHandler} from "react"
import styles from "./ListItem.module.scss"

export interface ListItemProps {
    title?: string,
    description?: string,
    value?: string | number | readonly string[],
    icon?: JSX.Element,
    onInput?: FormEventHandler<HTMLInputElement>,
}

const ListItem: FC<ListItemProps> = ({
    title,
    description,
    value,
    icon,
    onInput,
}) => <label className={styles["list-item"]}>
    {icon}
    <div style={{display: "inline-grid"}}>
        <label>{title}</label>
        <p>{description}</p>
    </div>
    <input
        type="radio"
        name="list-item"
        value={value}
        onInput={onInput}
    />
</label>

export default ListItem