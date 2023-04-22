import { Alert, Space } from "antd";
import React, { FC } from "react";
import { FieldError } from "react-hook-form";


interface IErrorProp {
    error?: FieldError;
    errorMessage?: string;
}

const Error: FC<IErrorProp> = ({ error, errorMessage }) => {
    return <div>
        {error && (<Space>
            <Alert message={errorMessage} type='error' />
        </Space>)}
    </div>;
};

export default Error;