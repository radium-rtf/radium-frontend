import { FC, useEffect } from 'react';
import CourseCard from "../../components/CourseCard/CourseCard";
import EmptyPage from '../../components/EmptyPage/EmptyPage';
import Header from '../../components/Header/Header';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ICardCourse } from '../../interfaces/course.interface';
import { fetchUser } from '../../store/actionCreators/actionCreatorsAuth';
import styles from './MyCourses.module.scss';
import { getCourses } from '../../store/actionCreators/actionCreatorsCourse';


const MyCourses: FC = () => {

    const dispatch = useAppDispatch();
    const { courses, isLoading } = useAppSelector(state => state.course);
    const token = useAppSelector(state => state.auth.accessToken);

    useEffect(() => {
        dispatch(getCourses(token));
        dispatch(fetchUser(token));
    }, [dispatch]);

    return (
        <>
            <div>
                <Header title='Мои курсы' className='myCourseHeader' />
            </div>
            <div className={styles.wrapper}>
                <div>{isLoading ? (<div>
                    <span>Loading...</span>
                </div>) : courses.length ?
                    (<div className={styles.wrapperCourse}>
                        {courses.map((course: ICardCourse) => (
                            <CourseCard
                                style={{ marginRight: '30px' }}
                                key={course.id}
                                name={course.name}
                                logo={course.logo}
                                className='courseCard'
                                classNameLogo='Image'
                                id={course.id}
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