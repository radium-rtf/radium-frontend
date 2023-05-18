import React, {CSSProperties} from 'react';

interface ITextFieldProps {
    className?: string;
    type?: 'checkbox';
    disabled?: boolean;
    text?: string;
    style?: CSSProperties;
}

const TextField = ({ type='', className = '', style='', disabled=false,  styles=''}) => {
    // return (
    //     <div className={styles[className]}>
    //         <textarea cols={10} rows={10} ></textarea>
    //     </div>
    // );
};

export default TextField;