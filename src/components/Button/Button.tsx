import { CSSProperties, FC } from "react"
import styles from './Button.module.scss';


interface IButtonProps {
    callback?: () => void;
    label?: string;
    type?: "button" | "submit" | "reset";
    className?: string;
    style?: CSSProperties;
    
}

const Button: FC<IButtonProps> = ({ type, className = '', style, callback, label }) => {
    return (
        <div>
            <button
                onClick={callback}
                type={type}
                className={styles[className]}
                style={style}
            >
                {label}
            </button>
        </div>
    )
}
export default Button;