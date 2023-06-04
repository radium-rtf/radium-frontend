import { FC } from 'react';
import Button from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';
import questionMark from "../../images/_.svg";
import circle from "../../images/circle.svg";
import styles from './SectionAnswer.module.scss';


interface ISectionAnswerProps {
    title?: string;
    description?: string;
    question?: string;
}

const SectionAnswer: FC<ISectionAnswerProps> = ({
    title = 'Знакомство с Kotlin. Первая программа',
    description = 'Задача организации, в особенности же повышение уровня гражданского сознания играет важную роль в формировании системы массового участия.'
    + ' Противоположная точка зрения подразумевает, что явные признаки победы институционализации описаны максимально подробно.'
    + ' А ещё реплицированные с зарубежных источников, современные исследования формируют глобальную экономическую сеть и при этом — ограничены исключительно образом мышления.',
    question = 'Объекты каких типов можно положить в List CharSequence?'
}) => {

    
    return (
        <div className={styles["tasksWrapper"]}>
            <div className={styles["tasks"]}>
                <div className={styles["title"]}>
                    <h1>{title}</h1>
                </div>
                <div className={styles["questionsBlock"]}>
                    <div className={styles["description"]}>
                        <p>
                            {description}
                        </p>
                    </div>
                    <div className={styles["question"]}>
                        <img className={styles["circle"]} src={circle} alt="" />
                        <img
                            className={styles["questionMark"]}
                            src={questionMark}
                            alt=""
                        />
                        <h4>Вопрос</h4>
                    </div>
                    <div className={styles["text"]}>
                        <p>{question}</p>
                        <ul>
                            <li>
                                <Checkbox
                                    type="checkbox"
                                    className="customCheckbox"
                                    label="String"
                                />
                            </li>
                            <li>
                                <Checkbox
                                    type="checkbox"
                                    className="customCheckbox"
                                    label="CharSequence"
                                />
                            </li>
                            <li>
                                <Checkbox
                                    type="checkbox"
                                    className="customCheckbox"
                                    label="List Char"
                                />
                            </li>
                        </ul>
                    </div>
                    <div className={styles["bottomBlock"]}>
                        <p>123 попытки</p>
                        <p>123 балла</p>
                        <Button label="Сбросить" type="reset" className="btnReset"/>
                        <Button label="Ответить" type="submit" className="btnAnswer" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SectionAnswer