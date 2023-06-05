import {FC} from "react";
import styles from "./Switch.module.scss";

interface SwitchProps {
    label?: string,
    name?: string,
    disabled?: boolean,
    defaultChecked?: boolean,
}

const Switch: FC<SwitchProps> = ({
    label,
    name,
    disabled,
    defaultChecked,
}) => <label className={styles["switch"]}>
    {label}
    <input
        type="checkbox"
        name={name}
        disabled={disabled}
        defaultChecked={defaultChecked}
    />
</label>

export default Switch