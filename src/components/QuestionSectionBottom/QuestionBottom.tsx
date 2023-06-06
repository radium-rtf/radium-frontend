import {FC} from "react"
import styles from "./QuestionBottom.module.scss"
import Button from "../Button/Button"
import * as Icons from "../../icons/icons"

interface QuestionBottomProps {
    attempts?: number
    score?: number
    maxScore?: number
    state: "initial" | "correct" | "partial" | "incorrect"
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
            score != undefined && state != "initial"
                ? `${score} / ${maxScore} ${getPluralScore(maxScore)}`
                : `${maxScore} ${getPluralScore(maxScore)}`
        )
    }</p>
    {hasReset && <Button
        label="Сбросить"
        icon={Icons.Reset}
        style="outlined"
        type="reset" />}
    <Button
        label={submitMode == "submit" ? "Ответить" : "Отправить"}
        icon={submitMode == "submit" ? Icons.Submit : Icons.Send}
        style="accent"
        type="submit"
        disabled={attempts == 0}
    />
</div>

const getPluralLeft = (amount: number) => {
    const last = amount % 10
    const twoLast = amount % 100
    return last == 0 || last >= 5 ||
    twoLast >= 11 && twoLast <= 14
        ? "Осталось"
        : last == 1
            ? "Осталась"
            : "Осталось"
}

const getPluralAttempts = (amount: number) => {
    const last = amount % 10
    const twoLast = amount % 100
    return last == 0 || last >= 5 ||
        twoLast >= 11 && twoLast <= 14
        ? "попыток"
    : last == 1
        ? "попытка"
        : "попытки"
}

const getPluralScore = (amount: number) => {
    const last = amount % 10
    const twoLast = amount % 100
    return last == 0 || last >= 5 ||
    twoLast >= 11 && twoLast <= 14
        ? "баллов"
        : last == 1
            ? "балла"
            : "баллов"
}

export default QuestionBottom