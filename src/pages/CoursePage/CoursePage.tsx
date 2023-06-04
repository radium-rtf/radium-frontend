import { useEffect, useState } from 'react';
import TopPanel from "../../components/TopPanel/TopPanel";
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import SectionAnswer from '../../components/SectionAnswer/SectionAnswer';
import styles from "./CoursePage.module.scss";
import ThemaModule from '../../components/ThemaModule/ThemaModule';
import { getCourseModule, getSlideById } from '../../store/actionCreators/actionCreatorsCourse';
import { IModule } from '../../interfaces/module.interface';


const CoursePage = () => {

    const moduleCourse = useAppSelector(state => state.module.moduleCourse);
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.accessToken);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    useEffect(() => {
        dispatch(getSlideById(activeIndex));
        dispatch(getCourseModule(token));
    }, [token, dispatch, activeIndex]);

    const activeCourseHandler = (index: number) => {
        setActiveIndex(index);
    }

    return (
        <>
            <div className={styles["main"]}>
                <TopPanel />
                <div className={styles["wrapper"]}>
                    <nav className={styles["navBar"]}>
                        <div>
                            <h3 className={styles['title']}>Первые шаги</h3>
                            {moduleCourse.modules?.length
                                ? (moduleCourse.modules.map((module: IModule, index: number) => (<div
                                    onClick={() => activeCourseHandler(index)}
                                    key={index}>
                                    <ThemaModule
                                        name={module.name}
                                        activeIndex={activeIndex}
                                        isActive={activeIndex === index} />
                                </div>)))
                                : <p>Темы не найдены</p>}
                        </div>
                    </nav>
                    <SectionAnswer />
                </div>
            </div>
        </>
    );
};

export default CoursePage;
