import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import styles from "./CoursePage.module.scss";
import { getCourse, getCourseModule } from '../../store/actionCreators/actionCreatorsCourse';
import Background from "../../components/Background/Background";
import TopPanel from "../../components/TopPanel/TopPanel";
import * as Icons from "../../icons/icons"
import LinearProgress from "../../components/LinearProgress/LinearProgress";
import MenuItem from "../../components/MenuItem/MenuItem";
import List from "../../components/List/List";
import { getPluralScore } from "../../utils/utils";
import Button from "../../components/Button/Button";
import MultiChoiceSection from "../../components/MultiChoiceSection/MultiChoiceSection";
import ShortAnswerSection from "../../components/ShortAnswerSection/ShortAnswerSection";
import SingleChoiceSection from "../../components/SingleChoiceSection/SingleChoiceSection";
import { fetchUser } from "../../store/actionCreators/actionCreatorsAuth";
import { useParams } from "react-router-dom";
import { Module, Page, Section } from '../../interfaces/module.interface';


const CoursePage = () => {
    // FIXME: подменные данные / моки, заменить реальными
    const courseProgress = 0.5;
    const pageScore = 20;
    const pageTotalScore = 100;
    const group = "УрФУ_Осень_2024"

    const nextPage = () => {
    };

    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.accessToken);
    const {name: userName, avatar} = useAppSelector(state => state.profile);
    const [sections, setSections] = useState([] as Section[]);
    const [pages, setPages] = useState<Page[]>([]);
    const course = useAppSelector(state => state.course.course);
    const params = useParams<'id'>();

    useEffect(() => {
        getSections();
        dispatch(getCourseModule(token));
        dispatch(fetchUser(token));
        dispatch(getCourse(params.id || '', token));
    }, [token, dispatch, course.slug]);

    const toPage = (pageName: string) => {
        const findResult: string[] = [];

        course.modules.forEach((module: Module) => {
            if (module.pages.length) {
                module.pages.forEach((page: Page) => {
                    findResult.push(pageName.replace(pageName, page.name));
                })

                module.pages.forEach((page: Page) => {
                    findResult.forEach((name: string) => {
                        if (page.name === name) {
                            console.log(page.id);
                        }
                    })
                })
            }
        })
    };

    const getSections = () => {
        const result: Section[] = [];

        course.modules?.map((module: Module) => {
            return module.pages;
        }).forEach((pages: Page[]) => {
            pages.forEach((page: Page) => {
                page.sections.forEach((section: Section) => {
                    result.push(section);
                })
            })
        })

        if (result.length) {
            setSections(result);
        }
    }

    return <>
        <Background/>
        <TopPanel
            image={course.logo}
            title={course.name}
            username={userName}
            profile={avatar || ''}
        />

        <div className={styles.root}>
            <div className={styles.panel}>
                <div className={styles.info}>
                    <LinearProgress
                        color="primary"
                        progress={courseProgress}
                        showPercentage={true}
                    />
                    <div style={{height: 10}}/>
                </div>
                {group && <MenuItem
                    icon={Icons.Group}
                    iconSize="small"
                    label={group}
                />}
                <List
                    items={course.modules}
                    defaultSelected="classes/classes"
                    onSelected={toPage}
                />
            </div>
            <div className={styles.page}>
                {sections.map((section: Section) => (
                    section.choice?.variants.length ?
                        <MultiChoiceSection
                            question={section.choice?.question || ''}
                            choices={section.choice?.variants.length ? section?.choice?.variants.map((variant: string) => variant) : []}
                            attempts={1}
                            maxScore={10}
                            state="initial"
                        /> : <></>
                ))}
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
                <div className={styles.footer}>
                    <LinearProgress color="primary" progress={pageScore / pageTotalScore}/>
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
