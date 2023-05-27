import React, {CSSProperties, FC} from 'react';
import styles from "../TextField/TextField.module.scss";


interface ITextFieldProps {
    className?: string;
    type?: 'checkbox';
    disabled?: boolean;
    text?: string;
    style?: CSSProperties;
}

const TextField: FC<ITextFieldProps> = ({
        type='',
        className = '',
        style='',
        disabled=false
    }) => {
    return (
        <div className={styles[className]}>
            <textarea cols={10} rows={10} ></textarea>
        </div>
    );
};

export default TextField;