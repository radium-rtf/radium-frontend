import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkedTasks, uncheckedTasks } from '../../constData';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUser } from '../../store/actionCreators/actionCreatorsAuth';
import Background from '../../ui/Background/Background';
import CourseCard from '../../ui/CourseCard/CourseCard';
import styles from './TeacherTasksCheck.module.scss';
import ShortAnswerSection from '../../ui/ShortAnswerSection/ShortAnswerSection';
import { getState } from '../../utils/utils';

const TeacherTasksCheck: FC = () => {
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
                        <h2>Знакомство с Kotlin. Первая программа</h2>
                        <ShortAnswerSection
                            question={'2'}
                            maxScore={2}
                            score={1}
                            state={getState(1, 2)}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeacherTasksCheck