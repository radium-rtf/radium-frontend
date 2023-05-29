import React, { FC, useEffect } from 'react';
import styles from "../AboutCourse/AboutCourse.module.scss";
import CourseCard from "../../components/CourseCard/CourseCard";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import ava from "../../images/kotlin.svg"
import logo from "../../images/kotlin.svg"
import authorAva1 from "../../images/image-logo-1.svg"
import authorAva2 from "../../images/image-logo-2.svg"
import telegramLogo from "../../images/telegram-logo.svg"
import discordLogo from "../../images/discord-logo.svg"
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUser, getCourse } from '../../store/actionCreators/actionCreatorsAuth';

const AboutCourse: FC = () => {
    const params = useParams<'id'>();
    const course = useAppSelector(state => state.course.course);
    const token = useAppSelector(state => state.auth.accessToken);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const name = useAppSelector(state => state.profile.name);


    useEffect(() => {
        dispatch(getCourse(Number(params.id), token));
        dispatch(fetchUser(token));
    },[dispatch, token]);

    return (
        <>
            <div className={styles.wrapper}>
                <Header
                    className='header'
                    caption='Курс'
                    userLogin={name}
                    logoPath={logo}
                />
                <div className={styles['courseTitle']}>
                    <b>{course.name}</b>
                    <Button
                        callback={() => navigate(`/module/${params.id}`)}
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
                            <div className={styles['authors']}>
                                <b>Авторы</b>
                                <div className={styles['singleAuthor']}>
                                    <img src={authorAva1} alt=""/>
                                    <p>Зоя Бабабуевна</p>
                                </div>
                                <div className={styles['singleAuthor']}>
                                    <img src={authorAva2} alt=""/>
                                    <p>Галя Амогусовна</p>
                                </div>
                            </div>
                            <div className={styles['contacts']}>
                                <b>Контакты</b>
                                <div className={styles['singleContact']}>
                                    <img src={telegramLogo} alt=""/>
                                    <p>Telegram</p>
                                </div>
                                <div className={styles['singleContact']}>
                                    <img src={discordLogo} alt=""/>
                                    <p>Discord</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
};

export default AboutCourse;