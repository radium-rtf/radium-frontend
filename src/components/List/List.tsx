import { FC } from "react"
import ListItem, { ListItemProps } from "../ListItem/ListItem"
import styles from "./List.module.scss"

interface ListProps {
    items: { title: string, items: ListItemProps[] }[],
    width?: number | string,
    defaultSelected?: string,
    onSelected?: (value: string) => void,
}

const List: FC<ListProps> = ({
     items,
     width,
     defaultSelected,
     onSelected,
}) => {
    const menuItems = items?.map(({ title, items }) =>
        <div className={styles["list"]}>
            <h3>{title}</h3>
            {items.map(({ title, description, value, icon }) => {
                return <ListItem
                    title={title}
                    description={description}
                    value={value}
                    icon={icon}
                    defaultChecked={value === defaultSelected}
                    onInput={(event) => onSelected?.(event.currentTarget.value)}
                />
            })}
        </div>)
    return <form className={styles["list"]} style={{width: width}}>
        {menuItems}
    </form>
}

export default List