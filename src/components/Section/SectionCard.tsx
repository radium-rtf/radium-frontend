import { Section } from "../../interfaces/module.interface";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import TextSection from "../TextSection/TextSection";
import ShortAnswerSection from "../ShortAnswerSection/ShortAnswerSection";
import SingleChoiceSection from "../SingleChoiceSection/SingleChoiceSection";
import MultiChoiceSection from "../MultiChoiceSection/MultiChoiceSection";
import { TypeAnswer, getTypeAnswer } from "../../utils/utils";


const SectionCard: FC<Section> = ({
    id,
    pageId,
    order,
    text,
    shortanswer,
    choice,
    multichoice,
}) => {
    const [state, setState] = useState<TypeAnswer>('initial');
    const { handleSubmit, register } = useForm<{ answer: string }>();

    const answerHandler: SubmitHandler<{ answer: string }> = ({ answer }) => {
        setState(getTypeAnswer(answer));
    }

    return text
        ? <TextSection>{text.content}</TextSection>
        : shortanswer
            ? <ShortAnswerSection
                register={() => register('answer')}
                onSubmit={handleSubmit(answerHandler)}
                question={shortanswer.question}
                maxScore={shortanswer.maxScore}
                state={state}
            />
            : choice
                ? <SingleChoiceSection
                    register={() => register('answer')}
                    onSubmit={handleSubmit(answerHandler)}
                    question={choice.question}
                    choices={choice.variants}
                    maxScore={choice.maxScore}
                    state={state}
                />
                : multichoice
                    ? <MultiChoiceSection
                        register={() => register('answer')}
                        onSubmit={handleSubmit(answerHandler)}
                        question={multichoice.question}
                        choices={multichoice.variants}
                        maxScore={multichoice.maxScore}
                        state={state}
                    />
                    : <></>
}

export default SectionCard