import React, { FC } from 'react';
import { Link } from "react-router-dom";
import { IMenu } from '../../interfaces/menu.interface';
import styles from "../Menu/Menu.module.scss";

interface IMenuProps {
    menus: IMenu[]
}

const Menu: FC<IMenuProps> = ({
    menus
}) => {
    return (
        <div className={styles['menu']}>
            {menus.map((value: IMenu) => (
                <div className={styles['menuItem']} key={value.label + '__key__'}>
                    <img src={value.image} alt=""/>
                    <label>{value.label}</label>
                    <Link to={value.path} />
                </div>
            ))}
        </div>
    );
};

export default Menu;
