import React, {FC} from "react"
import styles from "./LinearProgress.module.scss"

interface LinearProgressProps {
    color: "primary" | "secondary",
    progress: number,
    showPercentage?: boolean,
}

const LinearProgress: FC<LinearProgressProps> = ({
    color,
    progress,
    showPercentage,
}) => {
    const percent = `${(progress * 100).toFixed(0)}%`
    return <div className={styles["progress"]}>
        <div className={styles["bg"]}>
            <div className={styles[`fg-${color}`]} style={{width: percent}}/>
        </div>
        <label hidden={!showPercentage}>{percent}</label>
    </div>
}

export default LinearProgress;