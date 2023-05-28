import { CSSProperties, FC } from "react"
import styles from './Slider.module.scss';


interface ISliderProps {
    className: string;
    type: 'checkbox';
    disabled?: boolean;
    label?: string;
    style?: CSSProperties;
}

const Slider: FC<ISliderProps> = ({ type, className = '', style, label }) => {
    return (
        <div>
            <label className={styles[className]}>
                <input type={type} className='switch__input'/>
                <span className='switch__slider'></span>
            </label>
        </div>
    )
}
export default Slider;