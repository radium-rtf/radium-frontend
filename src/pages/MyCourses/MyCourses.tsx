import { FC, useEffect } from 'react';
import styles from './MyCourses.module.scss';
import CourseCard from "../../components/CourseCard/CourseCard";
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ICardCourse } from '../../interfaces/course.interface';
import { getCourse, getCourses } from '../../store/actionCreators/actionCreatorsAuth';
import Header from '../../components/Header/Header';
import EmptyPage from '../../components/EmptyPage/EmptyPage';


const MyCourses: FC = () => {
    const courses = useAppSelector(state => state.course.courses);
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.accessToken);

    useEffect(() => {
        console.log(token);

        dispatch(getCourses(token));
    }, [dispatch]);

    return (
        <>
            <div>
                <Header title='Мои курсы' className='myCourseHeader' userLogin='Андрей ✌️' />
            </div>
            <div className={styles.wrapper}>
                <div>{courses.length
                    ? (<div className={styles.wrapperCourse}>
                        {courses.map((course: ICardCourse) => (
                            <CourseCard
                                style={{ marginRight: '30px' }}
                                key={course.id}
                                name={course.name}
                                logo={course.logo}
                                className='courseCard'
                                classNameLogo='Image'
                            />
                        ))}
                    </div>)
                    : (<div className={styles.emptyPageError}><EmptyPage /></div>)}
                </div>
            </div>
        </>
    )
}
export default MyCourses;