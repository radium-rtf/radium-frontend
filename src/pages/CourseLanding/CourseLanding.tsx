import React from 'react';
import {FC} from 'react';
import styles from './CourseLanding.module.scss'
import kotlinBanner from '../../images/Баннер.png'
const CourseLanding: FC = () => {
    return (
        <div className={styles.wrapper}>
            <img src={kotlinBanner} alt="" className={styles.banner}/>
            <div className={styles.content}>

                <div className={styles.title}>
                    <h1>Основы программирования на Kotlin</h1>
                </div>
                <div className={styles.extraInfo}>
                    <div className={styles.aboutCourse}>
                        <p>sdflkcvls slduf sljkel l kjsdfl l ajkwe lsjkdflu wjehfl hwjehf lsdjkf he fysdhf ywelkjfasduyf l
                        asdflhwkjefljskdfy h lsdfhjksyf hd yfkwehfjsadkjfl astfwalkejf asdfljk adsflkvxtk wegiftlkcvhxz</p>
                    {/* Блок с описанием курса */}
                    </div>

                    <div>
                    {/* Блок с авторами, контактами */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseLanding;