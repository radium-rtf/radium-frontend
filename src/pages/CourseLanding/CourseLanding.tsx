import React from 'react';
import {FC} from 'react';
import styles from './CourseLanding.module.scss'
import kotlinBanner from '../../images/Баннер.png'
import Button from "../../components/Button/Button";
import authorAva1 from "../../images/image-logo-1.svg"
import authorAva2 from "../../images/image-logo-2.svg"
import telegramLogo from "../../images/telegram-logo.svg"
import discordLogo from "../../images/discord-logo.svg"
import TextSection from "../../components/TextSection/TextSection";
import ListItem from "../../components/ListItem/ListItem";
import CourseCard from "../../components/CourseCard/CourseCard";
import Card from "../../components/Card/Card";
import profilePicture from "../../components/ProfilePicture/ProfilePicture";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import Background from "../../components/Background/Background";
import TopPanel from "../../components/TopPanel/TopPanel";
import courseImage from "../../images/kotlin.svg";
import profileImage from "../../images/кач.jpg";

const CourseLanding: FC = () => {
    const authors = [
        {
            description: 'Зоя Бабабуевна',
            icon: <ProfilePicture image={authorAva1}/>
        },
        {
            description: 'Галя Амогусовна',
            icon: <ProfilePicture image={authorAva2}/>
        },
    ]
    const contacts = [
        {
            description: 'Telegram',
            icon: <ProfilePicture image={telegramLogo} size={18}/>
        },
        {
            description: 'Discord',
            icon: <ProfilePicture image={discordLogo} size={18}/>
        },
    ]
    const description_courseWrap1 = '24 темы, 5 месяцев'
    const description_courseWrap2 = 'Kotlin - статически типизированный объектно-ориентированный язык программирования с удобным ' +
        'синтаксисом, способный компилироваться в байткод JVM, что делает его совместимым с Java. Этот курс поможет вам ' +
        'стать профессионалом в различных сферах, где применим Kotlin: бэкенд-разработка, мобильная разработка, ' +
        'веб-разработка. Если вы ранее изучали Java или Scala, изучить Kotlin вам будет очень просто.'
    return <>
        <Background />
        <TopPanel
            image={courseImage}
            title="Основы программирования на Kotlin"
            username="андрей"
            profile={profileImage}
        />
        <div className={styles.wrapper}>
            <div className={styles.bannerWrapper}>
                <img src={kotlinBanner} alt="" className={styles.banner}/>
            </div>

            <div className={styles.content}>
                <div className={styles.title}><h1>Основы программирования на Kotlin</h1></div>
                <div className={styles.grid}>
                    <div className={styles.column}>
                        <CourseCard
                            state='continue'
                            button='full'
                            topic={description_courseWrap1}
                        />
                        <TextSection children={`## О курсе\n\n${description_courseWrap2}`}/>
                    </div>
                    <div className={styles.column}>
                        <Card>
                            <h3>Авторы курса</h3>
                            {authors.map((author) =>
                                <ListItem description={author.description}
                                          icon={author.icon}/>)}
                        </Card>
                        <Card>
                            <h3>Контакты</h3>
                            {contacts.map((contact) =>
                                <ListItem description={contact.description}
                                          icon={contact.icon}/>)}
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    </>
};

export default CourseLanding;