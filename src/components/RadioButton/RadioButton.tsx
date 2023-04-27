import { CSSProperties, FC } from "react"
import styles from './RadioButton.module.scss';

interface IRadioButtonProps {
    type?: string;
    name?: string;
    value?: string;
    className?: string;
    style?: CSSProperties
    label?: string;
}

const RadioButton: FC<IRadioButtonProps> = ({ type, name, value, style, className = '', label }) => {
    return (
        <div>
            <label className={styles[className]}>
                <input
                    type={type}
                    name={name}
                    value={value}
                    className={styles[className]}
                    style={style}
                />
                <span>{label}</span>
            </label>
        </div>
    )
}
export default RadioButton;