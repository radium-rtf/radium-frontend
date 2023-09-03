import {FC} from "react"
import styles from "./QuestionHeader.module.scss"
import * as Icons from "../../shared/ui/icons"

const QuestionHeader: FC<{type: "question" | "task"}> = ({type}) =>
    <div className={styles["question-header"]}>
        {Icons.Question}
        <h4>{type == "task" ? "Задание" : "Вопрос"}</h4>
    </div>

export default QuestionHeader;