import {CSSProperties, FC} from "react";
import styles from "../CourseCard/CourseCard.module.scss";
import Button from "../Button/Button";
import logo from "../../images/kotlin.svg"

interface ICourseCardProps {
    title?: string;
    grades?: string;
    group?: string;
    className?: string;
    completionRate?: number;
    style?: CSSProperties;
    classNameImg?: string;
    contentStyle?: string;
}

const CourseCard: FC<ICourseCardProps> = ({
      title = 'Основы программирования на Kotlin',
      grades = '123 / 246 баллов',
      group = 'УрФУ_Осень 2024',
      className = '',
      completionRate = 50,
      style,
      classNameImg='',
      contentStyle='',
  }) => {
    return (
        <div className={styles[className]}>
            <div className={styles[contentStyle]}>
                <div style={{ display:"flex", margin:'24px'}}>
                    <h3>{title}</h3>
                    <img
                        src={logo}
                        alt=""
                        className={styles[classNameImg]}/>
                </div>
                {/*<div className={styles[contentStyle]}>*/}
                {/*    {completionRate}*/}
                {/*</div>*/}
                <div style={{ display:"flex", margin:'24px'}}>
                    <div style={{ display: 'grid'}}>
                        <p>{grades}</p>
                        <p>Группа: {group}</p>
                    </div>
                    <Button
                        label='Продолжить'
                        className='btnCourceCard'/>
                </div>
            </div>
        </div>

    )
}
export default CourseCard;