import React, {FC} from 'react';
import styles from "../AboutCourse/AboutCourse.module.scss";
import CourseCard from "../../components/CourseCard/CourseCard";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import ava from "../../images/kotlin.svg"

const AboutCourse: FC = () => {

    return (
        <>
            <div className={styles.wrapper}>
                <Header
                    className='header'
                    title='Kotlin'
                    caption='Курс'
                    userLogin='андрей'
                />
                <div className={styles['courseTitle']}>
                    <b>Основы программирования на Kotlin</b>
                    <Button
                        style={{margin: '36px 36px 0 0'}}
                        label='Продолжить/Начать'
                        type='submit'
                        className='btn'
                    />
                    <div className={styles['row']}>
                        <div className={styles['courseDescription']}>
                            <b>О курсе</b>
                            <p>Kotlin - статически типизированный объектно-ориентированный язык программирования с
                                удобным
                                синтаксисом, способный компилироваться в байткод JVM, что делает его совместимым с
                                Java.
                                Этот курс поможет вам стать профессионалом в различных сферах, где применим Kotlin:
                                бэкенд-разработка, мобильная разработка, веб-разработка. Если вы ранее изучали Java
                                или
                                Scala, изучить Kotlin вам будет очень просто.</p>
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