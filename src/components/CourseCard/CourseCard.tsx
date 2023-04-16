import {CSSProperties, FC} from "react";
import styles from "../CourseCard/CourseCard.module.scss";
import Button from "../Button/Button";
import logo from "../../images/kotlin_logo.png"

interface ICourseCardProps {
    // some props
    title?: string;
    grades?: string;
    group?: string;
    className?: string;
    completionRate?: number;
    style?: CSSProperties;
}

const CourseCard: FC<ICourseCardProps> = ({
    title='Основы программирования на Kotlin',
    grades='123 / 246 баллов',
    group='УрФУ_Осень 2024',
    className = 'courseCard',
    completionRate=50,
    style,
}) => {
    return (
        <div className={className}>
        <p>{title}</p>
        <p>{grades}</p>
        <p>Группа: {group}</p>
        <img
            src={logo}
            alt=""
            className={styles[className]}/>
        <Button
            label='Продолжить'
            type='submit'
            className='btn'
        />
        </div>

    )
}
export default CourseCard;