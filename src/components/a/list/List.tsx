import {FC} from "react"
import ListItem, {ListItemProps} from "../list-item/ListItem"
import styles from "./List.module.scss"

interface ListProps {
    items: { title: string, value?: string, items: ListItemProps[] }[],
    width?: number | string,
    onSelected?: (value?: string) => void,
}

const List: FC<ListProps> = ({
    items,
    width,
    onSelected,
}) => {
    const menuItems = items.map(({title, value, items}) =>
        <div className={styles["list"]}>
            <h3>{title}</h3>
            {items.map((item) => <ListItem
                title={item.title}
                description={item.description}
                value={value ? `${value}/${item.value}` : item.value}
                icon={item.icon}
                onInput={(event) => onSelected?.(event.currentTarget.value)}
            />)}
        </div>)

    return <form
        className={styles["list"]}
        style={{width: width}}
    >
        {menuItems}
    </form>
}

export default List