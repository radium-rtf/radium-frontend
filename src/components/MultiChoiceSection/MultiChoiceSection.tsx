import {FC} from "react"
import Card from "../Card/Card"
import QuestionHeader from "../QuestionHeader/QuestionHeader"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import QuestionBottom from "../QuestionSectionBottom/QuestionBottom";
import RadioButton from "../RadioButton/RadioButton";
import Checkbox from "../Checkbox/Checkbox";

interface MultiChoiceSectionProps {
    question: string
    choices: string[]
    attempts?: number
    score?: number
    maxScore?: number
    state: "initial" | "correct" | "partial" | "incorrect"
}

const MultiChoiceSection: FC<MultiChoiceSectionProps> = ({
    question,
    choices,
    attempts,
    score,
    maxScore,
    state,
}) => <Card>
    <form>
        <QuestionHeader type="question" />
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{question}</ReactMarkdown>
        {choices.map((choice) =>
            <Checkbox
                label={choice}
                name="answer"
                value={choice}
            />
        )}
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

export default MultiChoiceSection