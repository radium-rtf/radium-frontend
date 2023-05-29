import { CSSProperties, FC, useState } from "react"
import styles from './Header.module.scss';
import muscleman from "../../images/кач.jpg"
import Menu from "../Menu/Menu";
import { menus } from "../../interfaces/menu.interface";

interface IHeaderProps {
    title?: string;
    className?: string;
    style?: CSSProperties;
    caption?: string;
    userLogin?: string;
    logoPath?: string;
}

const Header: FC<IHeaderProps> = ({
    title = '',
    className = '',
    style,
    caption = '',
    userLogin = '',
    logoPath,

}) => {
    // const [showComponent, setShowComponent] = useState(false);
    // const handleClick = () => {
    //     console.log('hello')
    //     setShowComponent(true);
    // };
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
                <p>{userLogin}</p>
                <img src={muscleman} alt="" />
            </div>
        </div>
    )
}
export default Header;