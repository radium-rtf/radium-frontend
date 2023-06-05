import {FC} from "react"
import styles from "./RadialProgress.module.scss"

interface RadialProgressProps {
    progress: number,
}

const RadialProgress: FC<RadialProgressProps> = ({
    progress,
}) => <div
    className={styles["radial-progress"]}
    style={{
        backgroundImage: `conic-gradient(#BFD5FF ${progress * 100}%, rgba(255, 255, 255, 0.1) 0)`,
    }} />

export default RadialProgress