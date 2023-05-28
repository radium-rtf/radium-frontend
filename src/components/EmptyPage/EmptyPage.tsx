import React, {CSSProperties, FC} from 'react';
import emptyImage from "../../images/нет курсов.svg"
import {inspect} from "util";
import styles from "../EmptyPage/EmptyPage.module.scss";

interface IEmptyPageProps {
    title?: string;
    description?: string;
    className?: string;
}

const EmptyPage: FC<IEmptyPageProps> = ({
    title='Выглядит пусто!',
    description= 'Мы хорошенько поискали, но ничего по этому адресу найти не получилось...',
    className = '',
}) => {
    return (
        <div className={styles['emptyPage']}>
            <img src={emptyImage} alt=""/>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
};

export default EmptyPage;