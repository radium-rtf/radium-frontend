import {FC} from "react"
import ListItem, {ListItemProps} from "../ListItem/ListItem"
import styles from "./List.module.scss"

interface ListProps {
    items: { title: string, value?: string, items: ListItemProps[] }[],
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
    const menuItems = items.map(({title, value, items}) =>
        <div className={styles["list"]}>
            <h3>{title}</h3>
            {items.map((item) => {
                const v = value ? `${value}/${item.value}` : item.value;
                return <ListItem
                    title={item.title}
                    description={item.description}
                    value={v}
                    icon={item.icon}
                    defaultChecked={v === defaultSelected}
                    onInput={(event) => onSelected?.(event.currentTarget.value)}
                />
            })}
        </div>)

    return <form
        className={styles["list"]}
        style={{width: width}}
    >
        {menuItems}
    </form>
}

export default List