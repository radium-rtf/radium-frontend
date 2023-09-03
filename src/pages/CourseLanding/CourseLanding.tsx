import React, { FC, useEffect } from 'react';
import styles from './CourseLanding.module.scss'
import kotlinBanner from '../../images/Баннер.png'
import telegramLogo from "../../images/telegram-logo.svg"
import TextSection from "../../ui/TextSection/TextSection";
import CourseCard from "../../ui/CourseCard/CourseCard";
import Card from "../../ui/Card/Card";
import ProfilePicture from "../../ui/ProfilePicture/ProfilePicture";
import Background from "../../ui/Background/Background";
import TopPanel from "../../ui/TopPanel/TopPanel";
import { Author, Link } from "../../interfaces/course.interface";
import { getCourse } from "@/shared/api/actionCreators/actionCreatorsCourse";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUser } from "@/shared/api/actionCreators/actionCreatorsAuth";
import MenuItem from "../../ui/MenuItem/MenuItem";
import {useAppDispatch, useAppSelector} from "@/shared/api/store";

const CourseLanding: FC = () => {
    const description_courseWrap1 = '24 темы, 5 месяцев';
    const {name: userName, avatar} = useAppSelector(state => state.profile);
    const course = useAppSelector(state => state.course.course);
    const {authors, links: contacts} = useAppSelector(state => state.course.course);
    const token = useAppSelector(state => state.auth.accessToken);
    const dispatch = useAppDispatch();
    const params = useParams<'id'>();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCourse(params.id || '', token));
        dispatch(fetchUser(token));
        document.title = `${course.name} - Радиум`
    }, [dispatch, params.id, token, course.name]);

    return <>
        <Background/>
        <TopPanel
            image={course.logo}
            title={course.name}
            username={userName}
            profile={avatar || ''}
        />
        <div className={styles.wrapper}>
            <div className={styles.bannerWrapper}>
                <img src={kotlinBanner} alt="" className={styles.banner}/>
            </div>

            <div className={styles.content}>
                <div className={styles.title}><h1>{course.name}</h1></div>
                <div className={styles.grid}>
                    <div className={styles.column}>
                        <CourseCard
                            state='continue'
                            button='full'
                            topic={description_courseWrap1}
                            onClick={() => navigate(`/module/${course.modules[0].pages[0].id}`)}
                        />
                        <TextSection children={`## О курсе\n\n${course.shortDescription}`}/>
                    </div>
                    <div className={styles.column}>
                        <Card>
                            <h3>Авторы курса</h3>
                            {authors?.map((author: Author) => (
                                <MenuItem
                                    key={author.id}
                                    label={author.name}
                                    iconSize="large"
                                    icon={<ProfilePicture image={author.avatar}/>}/>))}
                        </Card>
                        <Card>
                            <h3>Контакты</h3>
                            {contacts?.map((contact: Link) =>
                                <MenuItem
                                    key={contact.id}
                                    label={contact.name}
                                    iconSize="small"
                                    icon={<ProfilePicture image={telegramLogo} size={18}/>}/>)}
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    </>
};

export default CourseLanding;