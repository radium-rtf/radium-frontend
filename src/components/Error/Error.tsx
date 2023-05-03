import { Alert, Space } from "antd";
import React, { CSSProperties, FC } from "react";
import { FieldError } from "react-hook-form";
import styles from './Error.module.scss';

interface IErrorProp {
    error?: FieldError;
    errorMessage?: string;
    className?: string;
}

const Error: FC<IErrorProp> = ({ error, errorMessage, className = '' }) => {
    return <div>
        {error && <div>
            <p className={styles[className]}>
                {errorMessage}
            </p>
        </div>}
    </div>;
};

export default Error;