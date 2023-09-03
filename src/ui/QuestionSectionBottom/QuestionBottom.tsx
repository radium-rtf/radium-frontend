import {FC} from "react"
import styles from "./QuestionBottom.module.scss"
import Button from "../Button/Button"
import * as Icons from "../../shared/ui/icons"
import {getPluralAttempts, getPluralLeft, getPluralScore} from "../../utils/utils"

interface QuestionBottomProps {
    attempts?: number
    score?: number
    maxScore?: number
    state?: "initial" | "correct" | "partial" | "incorrect"
    hasReset: boolean
    submitMode: "submit" | "send"
}

const QuestionBottom: FC<QuestionBottomProps> = ({
    attempts,
    score,
    maxScore,
    state,
    hasReset,
    submitMode,
}) => <div className={styles["question-bottom"]}>
    <div>
        <p className={styles[`state-${state}`]}>{
            state == "correct"
                ? "Верно!"
            : state == "partial"
                ? "Частично верно!"
            : state == "incorrect"
                ? "Неправильно!"
            : undefined
        }</p>
        <p>{
            attempts !== undefined && (
                attempts == 0
                    ? "Больше не осталось попыток"
                : state == "initial"
                    ? `${attempts} ${getPluralAttempts(attempts)}`
                    : `${getPluralLeft(attempts)} ${attempts} ${getPluralAttempts(attempts)}`
            )
        }</p>
    </div>
    <p>{
        maxScore && (
            score != undefined
                ? `${score} / ${maxScore} ${getPluralScore(maxScore)}`
                : `${maxScore} ${getPluralScore(maxScore)}`
        )
    }</p>
    {hasReset && <Button
        label="Сбросить"
        icon={Icons.Reset}
        color="outlined"
        type="reset" />}
    <Button
        label={submitMode == "submit" ? "Ответить" : "Отправить"}
        icon={submitMode == "submit" ? Icons.Submit : Icons.Send}
        color="accent"
        type="submit"
        disabled={attempts == 0}
    />
</div>

export default QuestionBottom