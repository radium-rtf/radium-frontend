import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUser, login } from '../../store/actionCreators/actionCreatorsAuth';
import styles from './TeacherMyCourses.module.scss';
import { getCourse, getCourses } from '../../store/actionCreators/actionCreatorsCourse';
import CourseCard from '../../components/CourseCard/CourseCard';
import Background from "../../components/Background/Background";
import TopPanel from "../../components/TopPanel/TopPanel";
import radiumLogo from "../../images/радиум лого.svg";
import kotlinLogo from "../../images/kotlin_logo.png";
import ava from "../../images/кач.jpg";
import { useNavigate } from "react-router-dom";
 
const tasks = [
    {
        id: 1,
        name: 'Основы программирования на Kotlin',
        logo: kotlinLogo,
        title: 'Классы данных',
        subtitle: 'Классы и наследование',
        profileImage: ava,
        checkerName: 'Алехандро',
        comment: 'все фигня переделывай',
    },
    {
        id: 2,
        name: 'Основы программирования на Kotlin',
        logo: kotlinLogo,
        title: 'Классы данных',
        subtitle: 'Классы и наследование',
        profileImage: ava,
        checkerName: 'Алехандро',
        comment: 'тоже фигня переделывай',
    },
]
 
const teacherCourses = [
    {
        id: 1,
        name: 'Основы программирования на Kotlin',
        logo: kotlinLogo,
    },
    {
        id: 2,
        name: 'Основы программирования на Kotlin',
        logo: kotlinLogo,
    },
    {
        id: 3,
        name: 'Основы программирования на Kotlin',
        logo: kotlinLogo,
    },
    {
        id: 3,
        name: 'Основы программирования на Kotlin',
        logo: kotlinLogo,
    },
]
 
 
const TeacherMyCourses: FC = () => {
    const dispatch = useAppDispatch();
    // const {courses, isLoading} = useAppSelector(state => state.course);
    const token = useAppSelector(state => state.auth.accessToken);
    const user = useAppSelector(state => state.profile);
    const { name, avatar } = useAppSelector(state => state.profile);
    const navigate = useNavigate();
 
    useEffect(() => {
        dispatch(getCourses(token));
        dispatch(fetchUser(token));
    }, [dispatch]);
 
    const detailCourseHandler = (id: string) => {
        navigate(`/course/${id}`)
        dispatch(getCourse(id, token));
    }
 
    return (
        <>
            <Background />
            <TopPanel
                image={radiumLogo}
                title="Радиум"
                username={name}
                profile={avatar}
            />
            <div className={styles.wrapper}>
                <div className={styles.tasks}>
                    {tasks.map((task) =>
                        <CourseCard
                            key={task.id}
                            name={task.name}
                            image={task.logo}
                            title={task.title}
                            subtitle={task.subtitle}
                            checkerName={task.checkerName}
                            profileImage={task.profileImage}
                            comment={task.comment}
                            progress={0.34}
                            topic='Следующая тема'
                            state='done'
                            button='short'
                            width={480}
                        // onClick={() => detailCourseHandler(task.id ?? '')}
                        />)}
                </div>
                <div className={styles.teacherCoursesHeader}>
                    <h2>Текущие курсы</h2>
                    <div className={styles.teacherCourses}>
 
                        {teacherCourses.map((course) =>
                            <CourseCard
                                key={course.id}
                                name={course.name}
                                image={course.logo}
                                progress={0.34}
                                topic='Следующая тема'
                                state='continue'
                                button='short'
                                width={480}
                            // onClick={() => detailCourseHandler(course.id ?? '')}
                            />)}
                    </div>
                </div>
            </div>
        </>
    )
}
export default TeacherMyCourses;