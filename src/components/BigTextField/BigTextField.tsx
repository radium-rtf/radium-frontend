import { FC } from "react";
import styles from "./BigTextField.module.scss";

interface BigTextFieldProps {
    label?: string,
    name?: string,
    postfix?: string,
    icon?: JSX.Element,  
    width?: number | string,
}

const BigTextField: FC<BigTextFieldProps> = ({
    label,
    name = '',
    postfix,
    icon,
    width,
}) => {
    return <label
        className={styles['text-area']}
    >
        <textarea>
        </textarea>
    </label>
}

export default BigTextField