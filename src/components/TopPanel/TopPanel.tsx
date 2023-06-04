import { CSSProperties, FC } from 'react';
import { useAppSelector } from '../../hooks/redux';
import muscleman from "../../images/кач.jpg";
import styles from './TopPanel.module.scss';

interface ITopPanelProps {
    title?: string;
    className?: string;
    style?: CSSProperties;
    // logoPath?: string;
}

const TopPanel: FC<ITopPanelProps> = ({
    title='Основы программирования на Kotlin',
    className='',
    style,
    // logoPath={muscleman},
}) => {

    const userName = useAppSelector(state => state.profile.name);

    return (
        <div className={styles['topPanel']}>
            <div className={styles["caption"]}>
                <h2>{title}</h2>
            </div>
            <div className={styles["profile"]}>
                <p>{userName}</p>
                <img src={muscleman} alt="" />
            </div>
        </div>
    );
};

export default TopPanel;