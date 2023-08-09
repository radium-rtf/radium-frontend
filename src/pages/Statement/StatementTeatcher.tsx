import { FC, useEffect } from 'react';
import Background from '../../ui/Background/Background';
import List from '../../ui/List/List';
import Table from '../../ui/Table/Table';
import TopPanel from "../../ui/TopPanel/TopPanel";
import { courses, statement, statementUser } from "../../constData";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import * as Icons from "../../icons/icons";
import emptyAvatar from '../../images/empty-profile.png';
import kotlinLogo from '../../images/kotlin.svg';
import { IStatementUser } from '../../interfaces/module.interface';
import { fetchUser } from "../../store/actionCreators/actionCreatorsAuth";
import styles from './StatementTeatcher.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import TeacherTasks from '../../components/TeacherTasks/TeacherTasks';
import CourseCard from '../../ui/CourseCard/CourseCard';
import TeacherTasksCheck from '../../components/TeacherTasksCheck/TeacherTasksCheck';
import CheckAnswerSection from '../../ui/CheckAnswerSection/CheckAnswerSection';

let content: JSX.Element;

const StatementTeatcher: FC = () => {
    const { name, avatar } = useAppSelector(state => state.profile);
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.accessToken);
    const navigate = useNavigate();
    const params = useParams<'id'>();
    const paramsPage = useParams();

    useEffect(() => {
        dispatch(fetchUser(token));
        navigate(`/statement/1`);

        console.log(paramsPage);
    }, [dispatch]);

    const toPage = (pageId: string) => {
        navigate(`/statement/${pageId}`);
    };

    switch (params.id) {
        case '1':
            content = <>
                <div className={styles.table}>
                    <Table title='Имя' courses={courses} statement={statement} />
                </div>
            </>
            break;
        case '2':
            content = <>
                <div className={styles.table}>
                    <TeacherTasks />
                </div>
            </>
            break;
        case '3':
            content = <>
                <div className={styles.table}>
                    <CourseCard
                        title='Напишите сочинение на тему "Как я провел лето"'
                        topic='Следующая тема'
                        state='done'
                        button='full'
                        width={480}
                    />
                </div>
            </>
            break;

        case '1-check':
            content = <>
                <div style={{ paddingLeft: '25px', alignItems: 'center' }}>
                    <h2>Знакомство с Kotlin. Первая программа</h2>
                    <br />
                    <CheckAnswerSection
                        text='Я провел лето просто прекрасно круто лалалалалаллалалалалал играл в комп с матерью не ругался гулял все прочее'
                        title='Напишите сочинение на тему “Как я провел лето”'
                    />
                </div>
            </>
            break;
        case '2-check':
            content = <>
                <div style={{paddingLeft: '25px', alignItems: 'center' }}>
                    <h2>Знакомство с Kotlin. Первая программа</h2>
                    <br />
                    <CheckAnswerSection
                        text='Ответ - 4'
                        title='Решите пример 2 + 2'
                    />
                </div>
            </>
            break;
    }

    return <div className={styles.stateStatement}>
        <Background />
        <div className={styles.tableWrapper}>
            <TopPanel
                image={kotlinLogo}
                title='Основы программирования на Kotlin'
                username={name}
                profile={avatar ? avatar : emptyAvatar}
            />
            <div style={{ display: 'flex' }}>
                <div className={styles.info}>
                    <div className={styles.panel}>
                        <List items={mapItems(statementUser)} defaultSelected={params.id} onSelected={toPage} />
                    </div>
                </div>
                {content}
            </div>
        </div>
    </div>
};

const mapItems = (users: IStatementUser[]) => ['УрФУ.Осень2024'].map((item: string) => {
    return {
        title: item,
        items: users?.map(user => {
            const userInfo: any = {
                title: user.title,
                description: user.description,
                value: user.id,
            }

            return user.title === 'Ведомость' ? { ...userInfo, icon: Icons.Statement } : { ...userInfo, icon: Icons.EmptyProfile }
        }),
    }
})

export default StatementTeatcher;
