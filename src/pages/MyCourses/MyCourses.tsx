import { FC, useEffect } from 'react';
// import EmptyPage from '../../components/EmptyPage/EmptyPage';
// import Header from '../../components/Header/Header';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ICardCourse } from '../../interfaces/course.interface';
import { fetchUser } from '../../store/actionCreators/actionCreatorsAuth';
import styles from './MyCourses.module.scss';
import { getCourses } from '../../store/actionCreators/actionCreatorsCourse';
import CourseCard from '../../components/CourseCard/CourseCard';
import courseImg from "../../images/kotlin.svg";

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
                {/*<Header title='Мои курсы' className='myCourseHeader' />*/}
            </div>
            <div className={styles.wrapper}>
                {/*<div>{isLoading ? (<div>*/}
                {/*    <span>Loading...</span>*/}
                {/*</div>) : courses.length ?*/}
                {/*    (<div className={styles.wrapperCourse}>*/}
                {/*        {courses.map((course: ICardCourse) => (*/}
                {/*            <CourseCard*/}
                {/*                name="Основы программирования на Kotlin"*/}
                {/*                image={courseImg}*/}
                {/*                state="continue"*/}
                {/*                description="Курс предназначен для студентов, намеренных изучить основы Android-, backend-*/}
                {/*                        и кроссплатформенной разработки на Kotlin - мультипарадигменном языке программирования,*/}
                {/*                        созданном компанией JetBrains."*/}
                {/*                topic="24 темы, 5 месяцев"*/}
                {/*                width="480px"*/}
                {/*                onClick={() => console.log("clicked card")}*/}
                {/*                onButtonClick={() => console.log("clicked button")}*/}
                {/*            />*/}
                {/*        ))}*/}
                {/*    </div>)*/}
                {/*    : (<div className={styles.emptyPageError}><EmptyPage /></div>)}*/}
                {/*</div>*/}
            </div>
        </>
    )
}
export default MyCourses;