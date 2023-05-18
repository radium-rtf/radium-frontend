import {FC} from "react";
import CourseCard from '../../components/CourseCard/CourseCard';
import Checkbox from "../../components/Checkbox/Checkbox";
import RadioButton from "../../components/RadioButton/RadioButton";
import Slider from "../../components/Slider/Slider";
import Header from "../../components/Header/Header";

const TestUIKit: FC = () => {
    return (
        <div>
            <Header
                className='header'
                title='Kotlin'
            />
            <CourseCard
                className='courseCard'
                classNameImg='Image'
            />
            <Checkbox
                className='customCheckbox'
                type='checkbox'
            />
            <div>
                <RadioButton
                    className='customRadioButton'
                    type='radio'
                />
                <RadioButton
                    className='customRadioButton'
                    type='radio'
                />
            </div>
            <Slider
                className='switch'
                type='checkbox'
            />
        </div>

    )
}

export default TestUIKit;