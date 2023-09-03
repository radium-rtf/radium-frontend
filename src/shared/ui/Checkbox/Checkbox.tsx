import { FC } from "react"
import styles from "./Checkbox.module.scss"
import {RegisterOptions, UseFormRegisterReturn} from "react-hook-form";

interface CheckboxProps {
    register?: (name: string, options?: RegisterOptions) => UseFormRegisterReturn
    label?: string,
    name?: string,
    value?: string,
    disabled?: boolean,
    defaultChecked?: boolean,
    onInput?: (value?: boolean) => void,
}

const Checkbox: FC<CheckboxProps> = ({
    register = () => undefined,
    label,
    name = '',
    value,
    disabled,
    defaultChecked,
    onInput,
}) => <label className={styles["checkbox"]}>
        <input
            {...register(name)}
            type="checkbox"
            name={name}
            value={value}
            disabled={disabled}
            defaultChecked={defaultChecked}
            onInput={(event) => onInput?.(event.currentTarget.checked)}
        />
        {label}
    </label>

export default Checkbox