import { CSSProperties, FC, useEffect } from "react";
import muscleman from "../../images/кач.jpg";
import styles from './Header.module.scss';
import { useAppSelector } from "../../hooks/redux";

interface IHeaderProps {
    title?: string;
    className?: string;
    style?: CSSProperties;
    caption?: string;
    logoPath?: string;
}

const Header: FC<IHeaderProps> = ({
    title = '',
    className = '',
    style,
    caption = '',
    logoPath,
}) => {
    // const [showComponent, setShowComponent] = useState(false);
    // const handleClick = () => {
    //     console.log('hello')
    //     setShowComponent(true);
    // };

    const userName = useAppSelector(state => state.profile.name);

    return (
        <div className={styles[className]}>
            <div className={styles["caption"]}>
                <b>{caption}</b>
            </div>
            <div className={styles["title"]}>
                {/* {logoPath ? (<img src={logoPath} alt="картинка курса" onClick={handleClick} />) : ''}
                {showComponent && <Menu menus={menus} />} */}


                <b>{title}</b>
            </div>
            <div className={styles["profile"]}>
                <p>{userName}</p>
                <img src={muscleman} alt="" />
            </div>
        </div>
    )
}
export default Header;