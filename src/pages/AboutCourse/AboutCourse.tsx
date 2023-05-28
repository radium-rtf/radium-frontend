import React, { FC, useEffect } from 'react';
import styles from "../AboutCourse/AboutCourse.module.scss";
import CourseCard from "../../components/CourseCard/CourseCard";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import ava from "../../images/kotlin.svg"
import logo from "../../images/kotlin.svg"
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getCourse } from '../../store/actionCreators/actionCreatorsAuth';

const AboutCourse: FC = () => {
    const params = useParams<'id'>();
    const course = useAppSelector(state => state.course.course);
    const token = useAppSelector(state => state.auth.accessToken);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCourse(Number(params.id), token));
    },[dispatch, token]);

    return (
        <>
            <div className={styles.wrapper}>
                <Header
                    className='header'
                    title='Kotlin'
                    caption='Курс'
                    userLogin='андрей ✌️'
                    logoPath={logo}
                />
                <div className={styles['courseTitle']}>
                    <b>{course.name}</b>
                    <Button
                        style={{ margin: '36px 36px 0 0' }}
                        label='Продолжить/Начать'
                        type='submit'
                        className='btn'
                    />
                    <div className={styles['row']}>
                        <div className={styles['courseDescription']}>
                            <b>О курсе</b>
                            <p>{course.description}</p>
                        </div>
                        <div className={styles['info']}>
                            <div>
                                <b>Авторы</b>
                                <p>Зоя бабабуевна</p>
                                <p>Галя Амогусовна</p>
                            </div>
                            <div>
                                <b>Контакты</b>
                                <p>Telegram</p>
                                <p>Discord</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
};

export default AboutCourse;