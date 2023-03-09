import { CSSProperties, FC } from "react"
import styles from './Button.module.scss';


interface IButtonProps {
    callback?: () => void;
    nameBtn: string;
    type?: "button" | "submit" | "reset" | undefined;
    className?: string;
    style?: CSSProperties | undefined
}

const Button: FC<IButtonProps> = ({ type, className = '', style, callback, nameBtn }) => {
    return (
        <div>
            <button
                onClick={callback}
                type={type}
                className={styles[className]}
                style={style}
            >
                {nameBtn}
            </button>
        </div>
    )
}
export default Button;