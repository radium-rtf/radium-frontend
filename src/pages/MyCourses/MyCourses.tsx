import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {fetchUser} from '../../store/actionCreators/actionCreatorsAuth';
import styles from './MyCourses.module.scss';
import {getCourses} from '../../store/actionCreators/actionCreatorsCourse';
import CourseCard from '../../components/CourseCard/CourseCard';
import Background from "../../components/Background/Background";
import TopPanel from "../../components/TopPanel/TopPanel";
import courseImage from "../../images/kotlin.svg";
import profileImage from "../../images/кач.jpg";
import radiumLogo from "../../images/радиум лого.svg";

const MyCourses: FC = () => {
    const userCourses = [
        {
            name: 'Основы программирования на Kotlin',
            image: `${courseImage}`,
            progress: 0.77,
            topic: 'Следующая тема',
        },
        {
            name: 'Основы программирования на Kotlin',
            image: `${courseImage}`,
            progress: 0.34,
            topic: 'Следующая тема'
        },
        {
            name: 'Основы программирования на Kotlin',
            image: `${courseImage}`,
            progress: 0.98,
            topic: 'Следующая тема'
        },
        {
            name: 'Основы программирования на Kotlin',
            image: `${courseImage}`,
            progress: 0.98,
            topic: 'Следующая тема'
        },
    ]

    const dispatch = useAppDispatch();
    const {courses, isLoading} = useAppSelector(state => state.course);
    const token = useAppSelector(state => state.auth.accessToken);

    useEffect(() => {
        dispatch(getCourses(token));
        dispatch(fetchUser(token));
    }, [dispatch]);

    return (
        <>
            <Background/>
            <TopPanel
                image={radiumLogo}
                title="Радиум"
                username="андрей"
                profile={profileImage}
            />
            <div className={styles.wrapper}>
                <div className={styles.cards}>
                    {userCourses.map((course) =>
                        <CourseCard
                            name={course.name}
                            image={course.image}
                            progress={course.progress}
                            topic={course.topic}
                            state='continue'
                            button='short'
                            width={480}
                        />)}
                </div>
            </div>
        </>
    )
}
export default MyCourses;