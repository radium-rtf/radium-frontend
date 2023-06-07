import {FC} from "react"
import Card from "../Card/Card"
import QuestionHeader from "../QuestionHeader/QuestionHeader"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import TextField from "../TextField/TextField";
import QuestionBottom from "../QuestionSectionBottom/QuestionBottom";

interface ShortAnswerSectionProps {
    question: string
    attempts?: number
    score?: number
    maxScore?: number
    state: "initial" | "correct" | "partial" | "incorrect"
}

const ShortAnswerSection: FC<ShortAnswerSectionProps> = ({
    question,
    attempts,
    score,
    maxScore,
    state,
}) => <Card>
    <form>
        <QuestionHeader type="question" />
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{question}</ReactMarkdown>
        <div style={{height: "16px"}} />
        <TextField
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