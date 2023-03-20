import { CSSProperties, FC } from "react"
import styles from './RadioButton.module.scss';
interface IRadioButtonProps {
    type?: string;
    name?: string;
    value?: string;
    className?: string;
    style?: CSSProperties
}

const RadioButton: FC<IRadioButtonProps> = ({ type, name, value, style, className = '' }) => {
    return (
        <div>
            <input
                type={type}
                name={name}
                value={value}
                className={styles[className]}
                style={style}
            />
        </div>
    )
}
export default RadioButton;