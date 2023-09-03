import { FC } from 'react';
import styles from './Table.module.scss';
import { IStatementCourse, ITableStatement } from '../../../interfaces/table-statement.interface';

interface ITableProps {
    title: string;
    courses?: string[];
    statement?: ITableStatement[];
    isCompleted?: boolean;
}

const Table: FC<ITableProps> = ({ title, courses, statement }) => {
    return (
        <div>
            <table className={styles.statementTable}>
                <tr>
                    <th className={styles.firstRowTitle}>{title}</th>
                    {courses?.map((course: string, index: number) => (
                        <th key={index + '__key__'} className={styles.firstRow}>{course}</th>
                    ))}
                </tr>
                {statement?.map((item: ITableStatement, index: number) => (
                    <tr key={index + '__key__'}>
                        <th className={styles.columnName}>{item.name}</th>
                        {item.courses.map((course: IStatementCourse, index: number) => (<th key={index + '__key__'}
                            className={styles.rowScore}>{course.score}</th>))}
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default Table;


