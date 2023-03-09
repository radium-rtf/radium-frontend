import { CSSProperties, FC } from "react"
import { FieldValues, RegisterOptions, useForm, UseFormRegister, UseFormRegisterReturn, UseFormReturn } from "react-hook-form";
import { IUser } from "../../types/user.interface"
import styles from './Input.module.scss';


interface IInputProps {
    register?: (name: string, options?: RegisterOptions) => UseFormRegisterReturn;
    controlName?: string;
    className?: string;
    type?: string;
    placeholder?: string;
    style?: CSSProperties;
}

const Input: FC<IInputProps> = ({
    register = () => undefined,
    controlName = '',
    className = '',
    type,
    placeholder,
    style
}) => {
    return (
        <div>
            <input
                {...register(controlName)}
                type={type}
                placeholder={placeholder}
                className={styles[className]}
                style={style}
            />
        </div>
    )
}
export default Input;