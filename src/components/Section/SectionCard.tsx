import { Section } from "../../interfaces/module.interface";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import TextSection from "../TextSection/TextSection";
import ShortAnswerSection from "../ShortAnswerSection/ShortAnswerSection";
import SingleChoiceSection from "../SingleChoiceSection/SingleChoiceSection";
import MultiChoiceSection from "../MultiChoiceSection/MultiChoiceSection";
import { TypeAnswer } from "../../utils/utils";
import { addAnswer, getPage } from "../../store/actionCreators/actionCreatorsCourse";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";


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
    const {handleSubmit, register} = useForm<{ answer: string }>();
    const token = useAppSelector(state => state.auth.accessToken);
    const section = useAppSelector(state => state.section.section)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getPage(token, pageId));
    }, [dispatch, section]);

    const answerHandler: SubmitHandler<{ answer: string }> = ({answer}) => {

        // if (shortanswer) {
        //     dispatch(addAnswer(token, {shortAnswer: {answer, id}}));
        //     setState('correct');
        // }

        if (choice) {
            dispatch(addAnswer(token, {choice: {answer, id}}));
            dispatch(getPage(token, pageId));
            setState(getState(choice.maxScore, choice.score));
        }

        // multichoice
        // ? dispatch(addAnswer(token,{multiChoice: {answer, id}}))
        // : console.log(1);
    }

    return text
        ? <TextSection>{text.content}</TextSection>
        : shortanswer
            ? <ShortAnswerSection
                register={() => register('answer')}
                onSubmit={handleSubmit(answerHandler)}
                question={shortanswer.question}
                maxScore={shortanswer.maxScore}
                score={shortanswer.score}
                state={state}
            />
            : choice
                ? <SingleChoiceSection
                    register={() => register('answer')}
                    onSubmit={handleSubmit(answerHandler)}
                    question={choice.question}
                    choices={choice.variants}
                    maxScore={choice.maxScore}
                    score={choice.score}
                    state={state}
                />
                : multichoice
                    ? <MultiChoiceSection
                        register={() => register('answer')}
                        onSubmit={handleSubmit(answerHandler)}
                        question={multichoice.question}
                        choices={multichoice.variants}
                        maxScore={multichoice.maxScore}
                        score={multichoice.score}
                        state={state}
                    />
                    : <></>
}

export default SectionCard

function getState(maxScore: number, score?: number): 'correct' | 'incorrect' | 'partial' | 'initial' {
    if (score === undefined) {
        return 'initial';
    }

    if (score === maxScore) {
        return 'correct';
    }

    if (score === 0) {
        return 'incorrect';
    }

    return 'partial';
}