import {FC, FormEventHandler} from "react"
import Card from "../Card/Card"
import QuestionHeader from "../QuestionHeader/QuestionHeader"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import TextField from "../TextField/TextField";
import QuestionBottom from "../QuestionSectionBottom/QuestionBottom";
import {RegisterOptions, UseFormRegisterReturn} from "react-hook-form";

interface ShortAnswerSectionProps {
    register?: (name: string, options?: RegisterOptions) => UseFormRegisterReturn
    question: string
    attempts?: number
    score?: number
    maxScore?: number
    state: "initial" | "correct" | "partial" | "incorrect"
    onSubmit?: FormEventHandler<HTMLFormElement>
    onReset?: FormEventHandler<HTMLFormElement>
}

const ShortAnswerSection: FC<ShortAnswerSectionProps> = ({
    register,
    question,
    attempts,
    score,
    maxScore,
    state,
    onSubmit,
    onReset,
}) => <Card>
    <form onSubmit={onSubmit} onReset={onReset}>
        <QuestionHeader type="question" />
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{question}</ReactMarkdown>
        <div style={{height: "16px"}} />
        <TextField
            register={register}
            label="Ответ"
            name="answer"
            type="text"
        />
        <QuestionBottom
            attempts={attempts}
            score={score}
            maxScore={maxScore}
            state={state}
            hasReset={true}
            submitMode="submit"
        />
    </form>
</Card>

export default ShortAnswerSection