import { CSSProperties, FC } from "react"
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";
import styles from './Input.module.scss';


interface IInputProps {
    register?: (name: string, options?: RegisterOptions) => UseFormRegisterReturn;
    controlName?: string;
    className?: string;
    type?: string;
    placeholder?: string;
    style?: CSSProperties;
    options?: any;
}

const Input: FC<IInputProps> = ({
    register = () => undefined,
    controlName = '',
    className = '',
    type,
    placeholder,
    style, options
}) => {
    return (
        <div>
            <input
                {...register(controlName, options)}
                type={type}
                placeholder={placeholder}
                className={styles[className]}
                style={style}
            />
        </div>
    )
}
export default Input;