import { FC, useState } from "react"
import ListItem, { ListItemProps } from "../ListItem/ListItem"
import styles from "./List.module.scss"
import { Module, Page } from "../../interfaces/module.interface";
import RadialProgress from "../RadialProgress/RadialProgress";

interface ListProps {
    items: Module[],
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

    const menuItems = items?.map((item: Module) =>
        <div className={styles["list"]}>
            <h3>{item.name}</h3>
            {item.pages.map((item: Page) => {
                const v = item.id;

                return <ListItem
                    title={item.name}
                    description={"30 / 100 баллов"}
                    value={v}
                    icon={<RadialProgress progress={0.3}/>}
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