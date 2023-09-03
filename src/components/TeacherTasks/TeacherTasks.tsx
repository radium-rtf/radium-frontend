import { FC, useEffect } from "react";
import Background from "@/shared/ui/Background/Background";
import TopPanel from "@/shared/ui/TopPanel/TopPanel";
import { useAppDispatch, useAppSelector } from "@/shared/api/store";
import { fetchUser } from "@/shared/api/actionCreators/actionCreatorsAuth";
import styles from './TeacherTasks.module.scss';
import CourseCard from "@/shared/ui/CourseCard/CourseCard";
import { checkedTasks, uncheckedTasks } from "../../constData";
import { useNavigate } from "react-router-dom";

const TeacherTasks: FC = () => {
    const { name, avatar } = useAppSelector(state => state.profile);
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.accessToken);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchUser(token));
    }, [dispatch]);

    return (
        <>
            <Background />
            <div className={styles.wrapper}>
                <div>
                    <div className={styles.teacherTasksHeader}>
                        <h2>Ожидает проверки</h2>
                        <div className={styles.teacherTasks}>
                            {checkedTasks.map((task) =>
                                <CourseCard
                                    key={task.id}
                                    title={task.title}
                                    subtitle={task.subtitle}
                                    checkerName={task.checkerName}
                                    profileImage={task.profileImage}
                                    comment={task.comment}
                                    onClick={() => navigate(`/tasks-check/${task.id}-check`)}
                                    progress={0.34}
                                    topic='Следующая тема'
                                    state='task-unchecked'
                                    button='full'
                                    width={480}
                                />)}
                        </div>
                    </div>
                </div>
                <div>
                    <div className={styles.teacherTasksHeader2}>
                        <h2>Проверено</h2>
                        <div className={styles.teacherTasks}>
                            {uncheckedTasks.map((task) =>
                                <CourseCard
                                    key={task.id}
                                    title={task.title}
                                    subtitle={task.subtitle}
                                    checkerName={task.checkerName}
                                    profileImage={task.profileImage}
                                    comment={task.comment}
                                    progress={0.34}
                                    topic='Следующая тема'
                                    state='task-checked'
                                    button='full'
                                    width={480}
                                />)}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};


export default TeacherTasks;