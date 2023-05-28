import { FC, useEffect } from 'react';
import styles from './MyCourses.module.scss';
import CourseCard from "../../components/CourseCard/CourseCard";
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ICardCourse } from '../../interfaces/course.interface';
import { getCourse, getCourses } from '../../store/actionCreators';
import Header from '../../components/Header/Header';


const MyCourses: FC = () => {

    const courses = useAppSelector(state => state.course.courses);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCourses());
        dispatch(getCourse(1))
    }, [dispatch]);

    return (
        <>
        <div>
        <Header title='Мои курсы' className='header'/>
        </div>
            <div className={styles.wrapper}>
                <div>{courses.length
                    ? (<div className={styles.wrapperCourse}>
                        {courses.map((course: ICardCourse) => (
                            <CourseCard
                                key={course.id}
                                name={course.name}
                                logo={course.logo}
                                className='courseCard'
                                classNameLogo='Image'
                            />
                        ))}
                    </div>)
                    : <p>Курсы не найдены</p>}
                </div>
            </div>
        </>
    )
}
export default MyCourses;