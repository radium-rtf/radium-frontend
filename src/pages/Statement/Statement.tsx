import { FC, useEffect, useState } from 'react';
import Background from '../../components/Background/Background';
import List from '../../components/List/List';
import Table from '../../components/Table/Table';
import TopPanel from "../../components/TopPanel/TopPanel";
import { courses, statement, statementUser } from "../../constData";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import * as Icons from "../../icons/icons";
import emptyAvatar from '../../images/empty-profile.png';
import kotlinLogo from '../../images/kotlin.svg';
import { IStatementUser } from '../../interfaces/module.interface';
import { fetchUser } from "../../store/actionCreators/actionCreatorsAuth";
import styles from './Statement.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { getPage } from '../../store/actionCreators/actionCreatorsCourse';
import TeacherTasks from '../TeacherTasks/TeacherTasks';
import CourseCard from '../../components/CourseCard/CourseCard';

let content: JSX.Element;

const Statement: FC = () => {
    const { name, avatar } = useAppSelector(state => state.profile);
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.accessToken);
    const navigate = useNavigate();
    const params = useParams<'id'>();

    useEffect(() => {
        dispatch(fetchUser(token));
    }, [dispatch]);

    const toPage = (pageId: string) => {
        navigate(`/statement/${pageId}`);
    };

    switch (params.id) {
        case '1':
            content = <>
                <Background />
                <div className={styles.tableWrapper}>
                    <div>
                        <TopPanel
                            image={kotlinLogo}
                            title='Основы программирования на котлин'
                            username={name}
                            profile={avatar ? avatar : emptyAvatar}
                        />
                    </div>
                    <div className={styles.info}>
                        <div className={styles.panel}>
                            <List items={mapItems(statementUser)} defaultSelected={params.id} onSelected={toPage} />
                        </div>
                        <div className={styles.table}>
                            <Table title='Имя' courses={courses} statement={statement} />
                        </div>
                    </div>
                </div>
            </>
            break;
        case '2':
            content = <>
                <Background />
                <div className={styles.tableWrapper}>
                    <div>
                        <TopPanel
                            image={kotlinLogo}
                            title='Основы программирования на котлин'
                            username={name}
                            profile={avatar ? avatar : emptyAvatar}
                        />
                    </div>
                    <div className={styles.info}>
                        <div className={styles.panel}>
                            <List items={mapItems(statementUser)} defaultSelected={params.id} onSelected={toPage} />
                        </div>
                        <div className={styles.table}>
                            <TeacherTasks />
                        </div>
                    </div>
                </div>
            </>
            break;
        case '3':
            content = <>
                <Background />
                <div className={styles.tableWrapper}>
                    <div>
                        <TopPanel
                            image={kotlinLogo}
                            title='Основы программирования на котлин'
                            username={name}
                            profile={avatar ? avatar : emptyAvatar}
                        />
                    </div>
                    <div className={styles.info}>
                        <div className={styles.panel}>
                            <List items={mapItems(statementUser)} defaultSelected={params.id} onSelected={toPage} />
                        </div>
                        <div className={styles.table}>
                            <CourseCard
                                title='Напишите сочинение на тему "Как я провел лето"'
                                topic='Следующая тема'
                                state='done'
                                button='full'
                                width={480}
                            />
                        </div>
                    </div>
                </div>
            </>
            break;
    }

    return <div className={styles.stateStatement}>
        {content}
    </div>;
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

export default Statement;
