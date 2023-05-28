import { CSSProperties, FC } from "react"
import styles from './Header.module.scss';
import logo from "../../images/kotlin.svg"

interface IHeaderProps {
    title?: string;
    className?: string;
    style?: CSSProperties;
}

const Header: FC<IHeaderProps> = ({
      title='Title',
      className='',
      style
}) => {
    return (
        <div className={styles[className]}>
            <ul>
                <li><img src={logo} alt="картинка курса"/></li>
                <li><b>{title}</b></li>
            </ul>


            {/*<div className={styles['courseHeaders']}>*/}
            {/*</div>*/}
        </div>
    )
}
export default Header;