import {FC} from "react"
import styles from "./Checkbox.module.scss"

interface CheckboxProps {
    label?: string,
    name?: string,
    disabled?: boolean,
    defaultChecked?: boolean,
    onInput?: (value?: boolean) => void,
}

const Checkbox: FC<CheckboxProps> = ({
    label,
    name,
    disabled,
    defaultChecked,
    onInput,
}) => <label className={styles["checkbox"]}>
    <input
        type="checkbox"
        name={name}
        disabled={disabled}
        defaultChecked={defaultChecked}
        onInput={(event) => onInput?.(event.currentTarget.checked)}
    />
    {label}
</label>

export default Checkbox