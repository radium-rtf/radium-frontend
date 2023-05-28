import {FC} from "react";
import CourseCard from '../../components/CourseCard/CourseCard';
import Checkbox from "../../components/Checkbox/Checkbox";
import RadioButton from "../../components/RadioButton/RadioButton";

const TestUIKit: FC = () => {
    return (
        <div>
            <CourseCard
                className='courseCard'
                classNameLogo='Image'
            />
            <Checkbox
                className='customCheckbox'
                type='checkbox'
            />

        </div>

    )
}

export default TestUIKit;