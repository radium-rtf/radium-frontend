import React, { FC } from 'react';
import { Link } from "react-router-dom";
import { IMenu } from '../../interfaces/menu.interface';

interface IMenuProps {
    menus: IMenu[]
}

const Menu: FC<IMenuProps> = ({
    menus
}) => {
    return (
        <div>
            {menus.map((value: IMenu) => (
                <div key={value.label + '__key__'}>
                    <label>{value.label}</label>
                    <Link to={value.path} />
                </div>
            ))}
        </div>
    );
};

export default Menu;
