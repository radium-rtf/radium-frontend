import { FC } from "react";
import styles from "./BigTextField.module.scss";

interface BigTextFieldProps {
    label?: string,
    name?: string,
    postfix?: string,
    icon?: JSX.Element,  
    width?: number | string,
    text?: string,
}

const BigTextField: FC<BigTextFieldProps> = ({
    label,
    name = '',
    postfix,
    icon,
    width,
    text
}) => {
    return <label
        className={styles['text-area']}
    >
        <textarea>
            {text}
        </textarea>
    </label>
}

export default BigTextField