import {FC} from "react"
import styles from './Checkbox.module.scss'

interface ICheckBoxProps {
    className: string;
    type: 'checkbox'
    text: string;
}

const Checkbox: FC<ICheckBoxProps> = ({type, className, text}) => {
    return (
        <div>
            <input
                type={type}
                className={styles[className]}
            />
            {text}
        </div>
    )
}
export default Checkbox;