import { FC, FormEventHandler } from "react"
import QuestionHeader from "../QuestionHeader/QuestionHeader"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import QuestionBottom from "../QuestionSectionBottom/QuestionBottom";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";
import BigTextField from "../BigTextField/BigTextField"
import Card from "../Card/Card";

interface LongAnswerSectionProps {
    register?: (name: string, options?: RegisterOptions) => UseFormRegisterReturn
    question: string
    attempts?: number
    score?: number
    maxScore?: number
    state: "initial" | "correct" | "partial" | "incorrect"
    onSubmit?: FormEventHandler<HTMLFormElement>
    onReset?: FormEventHandler<HTMLFormElement>
}

const LongAnswerSection: FC<LongAnswerSectionProps> = ({
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
            <QuestionHeader type="task" />
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{question}</ReactMarkdown>
            <div style={{ height: "16px" }} />
            <BigTextField />
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

export default LongAnswerSection