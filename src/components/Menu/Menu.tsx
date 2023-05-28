import React, {FC} from 'react';
import {Link} from "react-router-dom";

const menu: IMenu[] = [
    {
        label: 'Профиль',
        path: '/profile'
    },
    {
        label: 'Мои курсы',
        path: '/mycourses'
    },
    {
        label: 'Мои группы',
        path: '/'
    },
    {
        label: 'Выйти',
        path: '/logout'
    }
]


interface IMenu {
    label: string,
    path: string,
}

const Menu: FC<IMenu> = ({
}) => {
    return (
        <div>
        {menu.map((value: IMenu) => (
            <div>
                <label>{value.label}</label>
                <Link to={value.path}/>
            </div>
        ))}
        </div>
    );
};

export default Menu;