import { FC, useEffect } from "react";
import Background from "../../components/Background/Background";
import TopPanel from "../../components/TopPanel/TopPanel";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchUser } from "../../store/actionCreators/actionCreatorsAuth";
import kotlinLogo from '../../images/kotlin.svg';
import ava from "../../images/кач.jpg";
import styles from './TeacherTasks.module.scss';
import CourseCard from "../../components/CourseCard/CourseCard";

const tasks = [
    {
        id: 1,
        name: 'Основы программирования на Kotlin',
        logo: kotlinLogo,
        title: 'Классы данных',
        subtitle: 'Классы и наследование',
        profileImage: ava,
        checkerName: 'Алехандро',
        comment: '*комментарий*',
    },
    {
        id: 2,
        name: 'Основы программирования на Kotlin',
        logo: kotlinLogo,
        title: 'Классы данных',
        subtitle: 'Классы и наследование',
        profileImage: ava,
        checkerName: 'Алехандро',
        comment: '*комментарий*',
    },
]

const TeacherTasks: FC = () => {
    const { name, avatar } = useAppSelector(state => state.profile);
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.accessToken);

    useEffect(() => {
        dispatch(fetchUser(token));
    }, [dispatch]);

    return (
        <>
            <Background />
            <TopPanel
                image={kotlinLogo}
                title='Основы программирования на котлин'
                username={name}
                profile={avatar}
            />
            <div className={styles.wrapper}>
                <div className={styles.teacherTasksHeader}>
                    <h2>Текущие курсы</h2>
                    <div className={styles.teacherTasks}>
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
                                button='full'
                                width={480}
                            />)}
                    </div>
                </div>
            </div>
        </>
    );
};


export default TeacherTasks;