import React, {CSSProperties, FC} from 'react';
import muscleman from "../../images/кач.jpg"
import styles from './TopPanel.module.scss';
import Menu from "../Menu/Menu";
import {menus} from "../../interfaces/menu.interface";

interface ITopPanelProps {
    title?: string;
    className?: string;
    style?: CSSProperties;
    userLogin?: string;
    // logoPath?: string;
}

const TopPanel: FC<ITopPanelProps> = ({
    title='Основы программирования на Kotlin',
    className='',
    style,
    userLogin='андрей',
    // logoPath={muscleman},
}) => {
    return (
        <div className={styles['topPanel']}>
            <div className={styles["caption"]}>
                <h2>{title}</h2>
            </div>
            <div className={styles["profile"]}>
                <p>{userLogin}</p>
                <img src={muscleman} alt="" />
            </div>
        </div>
    );
};

export default TopPanel;