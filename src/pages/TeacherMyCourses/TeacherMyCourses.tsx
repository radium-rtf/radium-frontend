import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/api/store';
import { fetchUser } from '@/shared/api/actionCreators/actionCreatorsAuth';
import styles from './TeacherMyCourses.module.scss';
import { getCourse, getCourses } from '@/shared/api/actionCreators/actionCreatorsCourse';
import CourseCard from '../../ui/CourseCard/CourseCard';
import Background from "../../ui/Background/Background";
import TopPanel from "../../ui/TopPanel/TopPanel";
import radiumLogo from "../../images/радиум лого.svg";
import { useNavigate } from "react-router-dom";
import { tasks, teacherCourses } from '../../constData';


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