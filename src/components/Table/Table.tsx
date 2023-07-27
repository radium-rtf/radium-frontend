import { FC } from 'react';
import styles from './Table.module.scss';
import { IStatementCourse, ITableStatement } from '../../interfaces/table-statement.interface';

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
                        <td key={index + '__key__'} className={styles.firstRow}>{course}</td>
                    ))}
                </tr>
                {statement?.map((item: ITableStatement, index: number) => (
                    <tr key={index + '__key__'}>
                        <td className={styles.columnName}>{item.name}</td>
                        {item.courses.map((course: IStatementCourse, index: number) => (<td key={index + '__key__'}
                            className={styles.rowScore}>{course.score}</td>))}
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default Table;


