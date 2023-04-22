import {FC} from "react"
import styles from './Checkbox.module.scss'

interface ICheckBoxProps {
    className: string;
    type: 'checkbox';
    disabled?: boolean;
    label?: string;
}

const Checkbox: FC<ICheckBoxProps> = ({type, className, disabled, label}) => {
    return (
        <div>
            <label className={styles[className]}>
                <input
                    type={type}
                    className={styles[className]}
                    disabled={disabled}
                />
                <span>{label}</span>
            </label>
        </div>
    )
}
export default Checkbox;