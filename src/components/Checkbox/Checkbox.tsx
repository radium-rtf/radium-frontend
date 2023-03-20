import { FC } from "react"
import styles from './Checkbox.module.scss'

interface ICheckBoxProps {
    className: string;
    type: 'checkbox'
}

const Checkbox: FC<ICheckBoxProps> = ({ type, className }) => {
    return (
        <div>
            <input
                type={type}
                className={styles[className]}
            />
        </div>
    )
}
export default Checkbox;