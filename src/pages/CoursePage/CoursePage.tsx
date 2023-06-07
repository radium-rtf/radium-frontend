import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import styles from "./CoursePage.module.scss";
import { getCourseModule, getSlideById } from '../../store/actionCreators/actionCreatorsCourse';
import Background from "../../components/Background/Background";
import TopPanel from "../../components/TopPanel/TopPanel";
import * as Icons from "../../icons/icons"

// FIXME: подменные данные / моки, заменить реальными
import courseImage from "../../images/kotlin.svg"
import profileImage from "../../images/кач.jpg"
import LinearProgress from "../../components/LinearProgress/LinearProgress";
import MenuItem from "../../components/MenuItem/MenuItem";
import List from "../../components/List/List";
import RadialProgress from "../../components/RadialProgress/RadialProgress";
import {getPluralScore} from "../../utils/utils";
import Button from "../../components/Button/Button";
import MultiChoiceSection from "../../components/MultiChoiceSection/MultiChoiceSection";
import ShortAnswerSection from "../../components/ShortAnswerSection/ShortAnswerSection";
import SingleChoiceSection from "../../components/SingleChoiceSection/SingleChoiceSection";


const CoursePage = () => {
    // FIXME: подменные данные / моки, заменить реальными
    const courseProgress = 0.5;
    const pageScore = 20;
    const pageTotalScore = 100;
    const group = "УрФУ_Осень_2024"
    const contents = [
        {
            title: "Знакомство с Kotlin",
            value: "first-steps",
            items: [
                {
                    title: "Установка ПО и создание проекта",
                    description: "20 / 100 баллов",
                    value: "soft-installation",
                    icon: <RadialProgress progress={0.2} />,
                },
                {
                    title: "Вопросы для повторения",
                    description: "30 / 100 баллов",
                    value: "questions",
                    icon: <RadialProgress progress={0.3} />,
                },
            ],
        },
        {
            title: "Основные концепты Kotlin",
            value: "basics",
            items: [
                {
                    title: "Переменные",
                    description: "25 / 100 баллов",
                    value: "variables",
                    icon: <RadialProgress progress={0.25} />,
                },
                {
                    title: "Примитивные типы данных",
                    description: "100 / 100 баллов",
                    value: "primitives",
                    icon: <RadialProgress progress={1} />,
                },
                {
                    title: "Функции",
                    description: "60 / 100 баллов",
                    value: "functions",
                    icon: <RadialProgress progress={0.6} />,
                },
            ],
        },
        {
            title: "Классы",
            value: "classes",
            items: [
                {
                    title: "Строение класса",
                    description: "0 / 100 баллов",
                    value: "classes",
                    icon: <RadialProgress progress={0} />,
                },
                {
                    title: "Классы данных",
                    description: "30 / 100 баллов",
                    value: "data-classes",
                    icon: <RadialProgress progress={0.3} />,
                },
            ],
        },
    ]

    const toPage = (page: string) => {  };
    const nextPage = () => {  };
    // конец подменных данных

    const moduleCourse = useAppSelector(state => state.module.moduleCourse);
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.accessToken);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const sections = useAppSelector(state => state.slide.sections);

    useEffect(() => {
        dispatch(getSlideById(activeIndex));
        dispatch(getCourseModule(token));
    }, [token, dispatch, activeIndex]);

    const activeCourseHandler = (index: number) => {
        setActiveIndex(index);
    }

    return <>
        <Background />
        <TopPanel
            image={courseImage}
            title="Основы программирования на Kotlin"
            username="андрей"
            profile={profileImage}
        />

        <div className={styles.root}>
            <div className={styles.panel}>
                <div className={styles.info}>
                    <LinearProgress
                        color="primary"
                        progress={courseProgress}
                        showPercentage={true}
                    />
                    <div style={{height: 10}} />
                </div>
                {group && <MenuItem
                    icon={Icons.Group}
                    iconSize="small"
                    label={group}
                />}
                <List
                    items={contents}
                    defaultSelected="classes/classes"
                    onSelected={toPage}
                />
            </div>
            <div className={styles.page}>
                <MultiChoiceSection
                    question="Сколько будет **2 + 2**?"
                    choices={["1", "3", "5", "69"]}
                    attempts={1}
                    maxScore={10}
                    state="initial"
                />
                <ShortAnswerSection
                    question="Сколько будет **2 + 2**?"
                    attempts={1}
                    maxScore={10}
                    state="initial"
                />
                <SingleChoiceSection
                    question="Сколько будет **2 + 2**?"
                    choices={["1", "3", "5", "69"]}
                    attempts={1}
                    maxScore={10}
                    state="initial"
                />
                <MultiChoiceSection
                    question="Сколько будет **2 + 2**?"
                    choices={["1", "3", "5", "69"]}
                    attempts={1}
                    maxScore={10}
                    state="initial"
                />
                <MultiChoiceSection
                    question="Сколько будет **2 + 2**?"
                    choices={["1", "3", "5", "69"]}
                    attempts={1}
                    maxScore={10}
                    state="initial"
                />
                <div className={styles.footer}>
                    <LinearProgress color="primary" progress={pageScore / pageTotalScore} />
                    <p>{`${pageScore} / ${pageTotalScore} ${getPluralScore(pageTotalScore)}`}</p>
                    <Button
                        label="Далее"
                        icon={Icons.Start}
                        style="accent"
                        onClick={nextPage}
                    />
                </div>
            </div>
        </div>
    </>
};

export default CoursePage;
