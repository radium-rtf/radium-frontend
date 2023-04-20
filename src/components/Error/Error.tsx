import { Alert, Space } from "antd";
import React, { FC } from "react";
import { FieldError } from "react-hook-form";


interface IErrorProp {
    error?: FieldError;
    options?: any;
}

const Error: FC<IErrorProp> = ({ error, options }) => {
    return <div>
        {error && (<Space>
            <Alert message={options.errorMessage} type='error' />
        </Space>)}
    </div>;
};

export default Error;