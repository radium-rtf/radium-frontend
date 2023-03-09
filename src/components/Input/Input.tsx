import { CSSProperties, FC } from "react"
import { UseFormRegister } from "react-hook-form";
import { IUser } from "../../types/user.interface"
import styles from './Input.module.scss';

interface IInputProps {
    register: UseFormRegister<IUser>;
    controlName: keyof IUser;
    type?: string;
    placeholder?: string;
    style?: CSSProperties | undefined
    className?: string;
}

const Input: FC<IInputProps> = ({
    register,
    controlName,
    type,
    placeholder,
    className = '',
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