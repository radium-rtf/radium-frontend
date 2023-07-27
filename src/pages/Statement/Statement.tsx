import { FC, useEffect } from 'react';
import Background from '../../components/Background/Background';
import ListItem from '../../components/ListItem/ListItem';
import Table from '../../components/Table/Table';
import TopPanel from "../../components/TopPanel/TopPanel";
import { courses, statement, statementUser } from "../../constData";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import kotlinLogo from '../../images/kotlin.svg';
import { IStatementUser } from '../../interfaces/module.interface';
import { fetchUser } from "../../store/actionCreators/actionCreatorsAuth";
import styles from './Statement.module.scss';
import List from '../../components/List/List';
import RadialProgress from '../../components/RadialProgress/RadialProgress';
import * as Icons from "../../icons/icons";

const Statement: FC = () => {
    const { name, avatar } = useAppSelector(state => state.profile);
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.accessToken);

    useEffect(() => {
        dispatch(fetchUser(token));
    }, [dispatch]);

    return (
        <>
            <Background />
            <div className={styles.tableWrapper}>
                <div>
                    <TopPanel
                        image={kotlinLogo}
                        title='Основы программирования на котлин'
                        username={name}
                        profile={avatar}
                    />
                </div>
                <div className={styles.info}>
                    <div className={styles.panel}>
                        <List items={mapItems(statementUser)} />
                    </div>
                    <div className={styles.table}>
                        <Table title='Имя' courses={courses} statement={statement} />
                    </div>
                </div>
            </div>
        </>
    );
};

const mapItems = (users: IStatementUser[]) => ['УрФУ.Осень2024'].map((item: string) => {
    return {
        title: item,
        items: users?.map(user => {
            return {
                title: user.title,
                description: user.description,
                value: user.id,
                icon: Icons.Picture,
            }
        }),
    }
})

export default Statement;
