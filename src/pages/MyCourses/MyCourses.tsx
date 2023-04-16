import {FC} from 'react';
import styles from './MyCourses.module.scss';
import CourseCard from "../../components/CourseCard/CourseCard";

const MyCourses: FC = () => {

    return (
        <>
            <div className={styles.wrapper}>
                <CourseCard></CourseCard>
                <CourseCard></CourseCard>
                <CourseCard></CourseCard>
            </div>

        </>
    )
}
export default MyCourses;