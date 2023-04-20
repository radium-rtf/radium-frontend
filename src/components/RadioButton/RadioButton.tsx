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
            <label>Радио-кнопка
                <input
                type={type}
                name={name}
                value={value}
                className={styles[className]}
                style={style}
            />

            </label>
        </div>
    )
}
export default RadioButton;