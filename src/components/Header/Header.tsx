import { CSSProperties, FC } from "react"
import styles from './Header.module.scss';
import muscleman from "../../images/кач.jpg"

interface IHeaderProps {
    title?: string;
    className?: string;
    style?: CSSProperties;
    caption?: string;
    userLogin?: string;
    logoPath?: string;
}

const Header: FC<IHeaderProps> = ({
    title = 'Title',
    className = '',
    style,
    caption = '',
    userLogin = '',
    logoPath
}) => {
    return (
        <div className={styles[className]}>
            <div className={styles["caption"]}>
                <b>{caption}</b>
            </div>
            <div className={styles["title"]}>
                {logoPath ? (<img src={logoPath} alt="картинка курса" />) : ''}
                <b>{title}</b>
            </div>
            <div className={styles["profile"]}>
                <p>{userLogin}</p>
                <img src={muscleman} alt="" />
            </div>
        </div>
    )
}
export default Header;