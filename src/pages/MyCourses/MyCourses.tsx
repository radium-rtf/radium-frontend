import { FC } from 'react';
import styles from './MyCourses.module.scss';
import CourseCard from "../../components/CourseCard/CourseCard";
import Button from '../../components/Button/Button';

const MyCourses: FC = () => {

    return (
        <>
            <div className={styles.wrapper}>
                <div>
                    <CourseCard></CourseCard>
                    <Button
                        label='Продолжить'
                        type='submit'
                        className='btn'
                    />
                </div>
            </div>
        </>
    )
}
export default MyCourses;