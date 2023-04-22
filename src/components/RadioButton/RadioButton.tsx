import {CSSProperties, FC} from "react"
import styles from './RadioButton.module.scss';

interface IRadioButtonProps {
    type?: string;
    name?: string;
    value?: string;
    className?: string;
    style?: CSSProperties
    label?: string;
}

const RadioButton: FC<IRadioButtonProps> = ({type, name, value, style, className = '', label}) => {
    return (
        <div>
<<<<<<< HEAD
            <label className={styles[className]}>
                <input
                    type={type}
                    name={name}
                    value={value}
                    className={styles[className]}
                    style={style}
                />
                <span>{label}</span>
=======
            <label>Радио-кнопка
                <input
                type={type}
                name={name}
                value={value}
                className={styles[className]}
                style={style}
            />

>>>>>>> 42655556f2d6626e6259811125fead969078ec9a
            </label>
        </div>
    )
}
export default RadioButton;