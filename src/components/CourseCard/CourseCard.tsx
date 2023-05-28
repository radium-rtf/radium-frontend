import { CSSProperties, FC } from "react";
import styles from "../CourseCard/CourseCard.module.scss";
import Button from "../Button/Button";
import logo from "../../images/kotlin.svg"

interface ICourseCardProps {
    name?: string,
    logo?: string,
    grades?: string;
    group?: string;
    classNameLogo?: string;
    className?: string;
    completionRate?: number;
    contentStyle?: string;
    style?: CSSProperties;
}

const CourseCard: FC<ICourseCardProps> = ({
    name,
    grades = '123 / 246 баллов',
    group = 'УрФУ_Осень 2024',
    className = '',
    completionRate = 50,
    style,
    classNameLogo = '',
    contentStyle = '',
}) => {
    return (
        <div className={styles[className]}>
            <div className={styles[contentStyle]}>
                <div style={{ display: "flex", margin: '24px' }}>
                    <h3>{name}</h3>
                    <img
                        src={logo}
                        alt=""
                        className={styles[classNameLogo]} />
                </div>
                <div style={{ display: "flex", margin: '24px' }}>
                    <div style={{ display: 'grid' }}>
                        <p>{grades}</p>
                        <p>Группа: {group}</p>
                    </div>
                    <Button
                        label='Продолжить'
                        className='btnCourceCard' />
                </div>
            </div>
        </div>
    )
}
export default CourseCard;