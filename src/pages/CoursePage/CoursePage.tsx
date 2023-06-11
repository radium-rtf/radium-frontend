import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import styles from "./CoursePage.module.scss";
import {getCourse, getPage} from '../../store/actionCreators/actionCreatorsCourse';
import Background from "../../components/Background/Background";
import TopPanel from "../../components/TopPanel/TopPanel";
import * as Icons from "../../icons/icons"
import LinearProgress from "../../components/LinearProgress/LinearProgress";
import MenuItem from "../../components/MenuItem/MenuItem";
import List from "../../components/List/List";
import { getPluralScore } from "../../utils/utils";
import Button from "../../components/Button/Button";
import { fetchUser } from "../../store/actionCreators/actionCreatorsAuth";
import {useNavigate, useParams} from "react-router-dom";
import { Module, Section } from '../../interfaces/module.interface';
import SectionCard from "../../components/Section/SectionCard";
import RadialProgress from "../../components/RadialProgress/RadialProgress";

const CoursePage = () => {
    // FIXME: подменные данные / моки, заменить реальными
    const courseProgress = 0.5;
    const pageScore = 20;
    const pageTotalScore = 100;
    const group = ""

    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.accessToken);
    const {name: userName, avatar} = useAppSelector(state => state.profile);
    const {name} = useAppSelector(state => state.page);
    const sections = [...useAppSelector(state => state.page.sections)];
    const course = useAppSelector(state => state.course.course);
    const params = useParams<'id'>();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getPage(token, params.id as string))
        dispatch(fetchUser(token));
        dispatch(getCourse(params.id || '', token));
    }, [token, course.slug, params.id]);

    const toPage = (pageId: string) => {
        navigate(`/module/${pageId}`);
        dispatch(getPage(token, pageId))
    };

    const nextPage = () => {
    };

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
                    items={mapItems(course.modules)}
                    defaultSelected={params.id}
                    onSelected={toPage}
                />
            </div>
            <div className={styles.page}>
                <h1>{name}</h1>
                {sections.sort((s) => s.order).map((section: Section) =>
                    <SectionCard
                        id={section.id}
                        pageId={section.pageId}
                        order={section.order}
                        text={section.text}
                        shortanswer={section.shortanswer}
                        choice={section.choice}
                        multichoice={section.multichoice}
                    />)}
                <div className={styles.footer}>
                    <LinearProgress color="primary" progress={pageScore / pageTotalScore}/>
                    <p>{`${pageScore} / ${pageTotalScore} ${getPluralScore(pageTotalScore)}`}</p>
                    <Button
                        label="Далее"
                        icon={Icons.Start}
                        color="accent"
                        onClick={nextPage}
                    />
                </div>
            </div>
        </div>
    </>
};

const mapItems = (modules: Module[]) => modules.map(module => {
    return {
        title: module.name,
        items: module.pages.map(page => {
            return {
                title: page.name,
                description: "30 / 100 баллов",
                value: page.id,
                icon: <RadialProgress progress={0.3}/>,
            }
        }),
    }
})

export default CoursePage;
