import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {fetchUser} from '../../store/actionCreators/actionCreatorsAuth';
import styles from './MyCourses.module.scss';
import { getCourse, getCourses } from '../../store/actionCreators/actionCreatorsCourse';
import CourseCard from '../../components/CourseCard/CourseCard';
import Background from "../../components/Background/Background";
import TopPanel from "../../components/TopPanel/TopPanel";
import courseImage from "../../images/kotlin.svg";
import profileImage from "../../images/кач.jpg";
import radiumLogo from "../../images/радиум лого.svg";
import { useNavigate } from "react-router-dom";

const MyCourses: FC = () => {
    const dispatch = useAppDispatch();
    const {courses, isLoading} = useAppSelector(state => state.course);
    const token = useAppSelector(state => state.auth.accessToken);
    const userName = useAppSelector(state => state.profile.name);
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
            <Background/>
            <TopPanel
                image={radiumLogo}
                title="Радиум"
                username={userName}
                profile={profileImage}
            />
            <div className={styles.wrapper}>
                <div className={styles.cards}>
                    {courses.map((course) =>
                        <CourseCard
                            name={course.name}
                            image={course.logo}
                            progress={0.34}
                            topic='Следующая тема'
                            state='continue'
                            button='short'
                            width={480}
                            onClick={() => detailCourseHandler(course.id ?? '')}
                        />)}
                </div>
            </div>
        </>
    )
}
export default MyCourses;