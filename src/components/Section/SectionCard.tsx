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
import { storeConfig } from "../../store";


const SectionCard: FC<Section> = ({
                                      id,
                                      pageId,
                                      order,
                                      text,
                                      shortanswer,
                                      choice,
                                      multichoice,
                                  }) => {
    const {handleSubmit, register} = useForm<{ answer: string | string[] }>();
    const token = useAppSelector(state => state.auth.accessToken);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getPage(token, pageId));
    }, []);

    const answerHandler: SubmitHandler<{ answer: string | string[] }> = ({answer}) => {
        if (shortanswer && typeof answer === 'string') {
            dispatch(addAnswer(token, {shortAnswer: {answer, id}}));
        }

        if (choice && typeof answer === 'string') {
            dispatch(addAnswer(token, {choice: {answer, id}}));
        }

        if (multichoice && Array.isArray(answer)) {
            dispatch(addAnswer(token, {multiChoice: {answer, id}}));
        }

        dispatch(getPage(token, pageId));
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
                state={getState(shortanswer.maxScore, shortanswer.score)}
            />
            : choice
                ? <SingleChoiceSection
                    register={() => register('answer')}
                    onSubmit={handleSubmit(answerHandler)}
                    question={choice.question}
                    choices={choice.variants}
                    maxScore={choice.maxScore}
                    score={choice.score}
                    state={getState(choice.maxScore, choice.score)}
                />
                : multichoice
                    ? <MultiChoiceSection
                        register={() => register('answer')}
                        onSubmit={handleSubmit(answerHandler)}
                        question={multichoice.question}
                        choices={multichoice.variants}
                        maxScore={multichoice.maxScore}
                        score={multichoice.score}
                        state={getState(multichoice.maxScore, multichoice.score)}
                    />
                    : <></>
}

export default SectionCard;

function getState(maxScore: number = 10, score?: number): 'correct' | 'incorrect' | 'partial' | 'initial' {
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