import React from 'react';
import TopPanel from "../../components/TopPanel/TopPanel";
import styles from './CoursePage.module.scss';
import circleDone from "../../images/indDone.svg"
import circleHalf from "../../images/indDoneHalf.svg"
import circleZero from "../../images/indDoneZero.svg"
import circle from "../../images/circle.svg"
import questionMark from "../../images/_.svg"
import Checkbox from "../../components/Checkbox/Checkbox";
import Button from "../../components/Button/Button";

const CoursePage = () => {
    return (
        <div className={styles['main']}>
            <TopPanel/>
            <nav className={styles['navBar']}>
                <div>
                    <h3>Первые шаги</h3>
                    <div className={styles['menuItem']}>
                        <img src={circleDone} alt=""/>
                        <div className={styles['menuDescription']}>
                            <p className={styles['topicTitle']}>Знакомство с Kotlin. Первая программа</p>
                            <p className={styles['grades']}>123 / 123 баллов</p>
                        </div>
                    </div>
                    <div className={styles['menuItem']}>
                        <img src={circleHalf} alt=""/>
                        <div className={styles['menuDescription']}>
                            <p className={styles['topicTitle']}>Переменные. Мутабельность</p>
                            <p className={styles['grades']}>123 / 256 баллов</p>
                        </div>
                    </div>
                    <div className={styles['menuItem']}>
                        <img src={circleZero} alt=""/>
                        <div className={styles['menuDescription']}>
                            <p className={styles['topicTitle']}>Примитивные типы данных</p>
                            <p className={styles['grades']}>0 / 123 баллов</p>
                        </div>
                    </div>
                </div>
            </nav>
            <div className={styles['tasks']}>
                <div className={styles['title']}>
                    <h1>Знакомство с Kotlin. Первая программа</h1>
                </div>
                <div className={styles['questionsBlock']}>
                    <div className={styles['description']}>
                        <p>Задача организации, в особенности же повышение уровня гражданского сознания играет важную
                            роль в
                            формировании системы массового участия. Противоположная точка зрения подразумевает, что
                            явные
                            признаки победы институционализации описаны максимально подробно. А ещё реплицированные с
                            зарубежных источников, современные исследования формируют глобальную экономическую сеть и
                            при
                            этом — ограничены исключительно образом мышления.
                        </p>
                    </div>
                    <div className={styles['question']}>
                        <img className={styles['circle']} src={circle} alt=""/>
                        <img className={styles['questionMark']} src={questionMark} alt=""/>
                        <h4>Вопрос</h4>
                    </div>
                    <div className={styles['text']}>
                        <p>Объекты каких типов можно положить в List CharSequence?</p>
                        <ul>
                            <li><Checkbox type='checkbox' className='customCheckbox' label='String'/></li>
                            <li><Checkbox type='checkbox' className='customCheckbox' label='CharSequence'/></li>
                            <li><Checkbox type='checkbox' className='customCheckbox' label='List Char'/></li>
                        </ul>
                    </div>
                    <div className={styles['bottomBlock']}>
                        <p>123 попытки</p>
                        <p>123 балла</p>
                        <Button label='Сбросить' type='reset' className='btnReset'/>
                        <Button label='Ответить' type='submit' className='btnAnswer'/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePage;