import React, { FC, useEffect } from 'react'
import circleDone from "../../images/indDone.svg";
import styles from './ThemaModule.module.scss';
import { Link } from 'react-router-dom';

interface IThemaModuleProps {
    name: string;
    isActive?: boolean;
    activeIndex?: number;
}

const ThemeModule: FC<IThemaModuleProps> = ({ name, activeIndex, isActive = false }) => {

    useEffect(() => {
        console.log(activeIndex);
    }, [activeIndex]);

    return (
        <div className={styles["menuItem"]}>
            <img src={circleDone} alt="" />
            <div className={styles["menuDescription"]}>
                <p className={styles["topicTitle"]}>
                    <span className={`${isActive && styles['activeCardItem']}`}>
                        {name}
                    </span>
                </p>
                <p className={styles["grades"]}>123 / 123 баллов</p>
            </div>
        </div>
    )
}

export default ThemeModule;