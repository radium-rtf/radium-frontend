import {FC} from "react"
import styles from "./RadioButton.module.scss"
import {RegisterOptions, UseFormRegisterReturn} from "react-hook-form";

interface RadioButtonProps {
    register?: (name: string, options?: RegisterOptions) => UseFormRegisterReturn
    label?: string,
    name?: string,
    value?: string,
    disabled?: boolean,
    defaultChecked?: boolean,
}

const RadioButton: FC<RadioButtonProps> = ({
    register = () => undefined,
    label,
    name = '',
    value,
    disabled,
    defaultChecked,
}) => <label className={styles["radio"]}>
    <input
        {...register(name)}
        type="radio"
        name={name}
        value={value}
        disabled={disabled}
        defaultChecked={defaultChecked}
        onInput={() => console.log("hi modus")}
    />
    {label}
</label>

export default RadioButton