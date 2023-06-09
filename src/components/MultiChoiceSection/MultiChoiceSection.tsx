import {FC, FormEventHandler} from "react"
import Card from "../Card/Card"
import QuestionHeader from "../QuestionHeader/QuestionHeader"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import QuestionBottom from "../QuestionSectionBottom/QuestionBottom";
import RadioButton from "../RadioButton/RadioButton";
import Checkbox from "../Checkbox/Checkbox";
import {RegisterOptions, UseFormRegisterReturn} from "react-hook-form";

interface MultiChoiceSectionProps {
    register?: (name: string, options?: RegisterOptions) => UseFormRegisterReturn
    question: string
    choices: string[] | null
    attempts?: number
    score?: number
    maxScore?: number
    state: "initial" | "correct" | "partial" | "incorrect"
    onSubmit?: FormEventHandler<HTMLFormElement>
    onReset?: FormEventHandler<HTMLFormElement>
}

const MultiChoiceSection: FC<MultiChoiceSectionProps> = ({
    register,
    question,
    choices,
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
        {choices?.map((choice) =>
            <Checkbox
                register={register}
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