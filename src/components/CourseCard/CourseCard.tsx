import {FC, MouseEventHandler, ReactNode} from "react"
import Card from "../Card/Card"
import styles from "./CourseCard.module.scss"
import LinearProgress from "../LinearProgress/LinearProgress"
import Button from "../Button/Button";
import * as Icons from "../../icons/icons"
import Comment from "../Comment/Comment";

interface CourseCardProps {
    name?: string,
    image?: string,
    state: "discover" | "continue" | "checked" | "deadline",
    button: "short" | "full",
    description?: string,
    progress?: number,
    topic?: string,
    title?: string,
    subtitle?: string,
    checkerName?: string,
    profileImage?: string,
    comment?: string,
    width?: number | string,
    onClick?: MouseEventHandler<HTMLDivElement>,
    onButtonClick?: MouseEventHandler<HTMLButtonElement>,
}

interface BottomProps {
    icon: ReactNode,
    text?: string,
    label?: string,
    color: "accent" | "outlined",
    onClick?: MouseEventHandler<HTMLButtonElement>,
}

const Bottom: FC<BottomProps> = ({
    icon,
    text,
    label,
    color,
    onClick,
}) => <div className={styles["bottom"]}>
    {icon}
    <p>{text}</p>
    <Button
        icon={Icons.Start}
        label={label}
        color={color}
        onClick={onClick}
    />
</div>

/**
 *  АХТУНГ! на этой карточке при нажатии на кнопку срабатывают оба события onClick, починку этого я оставляю вам
 */
const CourseCard: FC<CourseCardProps> = ({
    name,
    image,
    state,
    button,
    description,
    progress,
    topic,
    title,
    subtitle,
    checkerName,
    profileImage,
    comment,
    width,
    onClick,
    onButtonClick,
}) => {
    const titleRegular = name && image && <div className={styles["title-regular"]}>
        <img src={image} />
        <div>
            <label>Курс</label>
            <h3>{name}</h3>
        </div>
    </div>
    const titleNotification = <div className={styles["title-notification"]}>
        <h3>{title}</h3>
        <p>{subtitle}</p>
    </div>

    let content: JSX.Element;
    switch (state) {
        case "discover":
            content = <>
                {titleRegular}
                <p>{description}</p>
                <Bottom
                    icon={Icons.Course}
                    text={topic || ""}
                    label={button == "full" ? "Начать" : undefined}
                    color="outlined"
                    onClick={onButtonClick}
                />
            </>
            break
        case "continue":
            content = <>
                {titleRegular}
                <LinearProgress color="primary" progress={progress || 0.0} showPercentage={true} />
                <Bottom
                    icon={Icons.Course}
                    text={topic || ""}
                    label={button == "full" ? "Продолжить" : undefined}
                    color="outlined"
                    onClick={onButtonClick}
                />
            </>
            break
        case "checked":
            content = <>
                <label style={{color: "#CEF2CE"}}>✅ Задание проверено</label>
                {titleNotification}
                {checkerName && profileImage && comment &&
                    <Comment image={profileImage} name={checkerName} comment={comment} />}
                <Bottom
                    icon={image && <img src={image} style={{borderRadius: 4}} />}
                    text={name}
                    label={button == "full" ? "Продолжить" : undefined}
                    color="accent"
                    onClick={onButtonClick} />
            </>
            break
        case "deadline":
            content = <>
                <label style={{color: "#F29191"}}>🚨 Скоро дедлайн!</label>
                {titleNotification}
                <Bottom
                    icon={image && <img src={image} style={{borderRadius: 4}} />}
                    text={name}
                    label={button == "full" ? "Продолжить" : undefined}
                    color="accent"
                    onClick={onButtonClick} />
            </>
            break
    }
    return <Card onClick={onClick} style={{width: width}}>
        <div className={styles["course-card"]}>
            {content}
        </div>
    </Card>
}

export default CourseCard