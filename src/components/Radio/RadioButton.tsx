import {FC} from "react"
import styles from "./RadioButton.module.scss"

interface RadioButtonProps {
    label?: string,
    name?: string,
    value?: string,
    disabled?: boolean,
    defaultChecked?: boolean,
}

const RadioButton: FC<RadioButtonProps> = ({
    label,
    name,
    value,
    disabled,
    defaultChecked,
}) => <label className={styles["radio"]}>
    <input
        type="radio"
        name={name}
        value={value}
        disabled={disabled}
        defaultChecked={defaultChecked}
    />
    {label}
</label>

export default RadioButton