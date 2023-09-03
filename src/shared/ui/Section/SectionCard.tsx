import { Section } from "../../../interfaces/module.interface";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import TextSection from "../TextSection/TextSection";
import ShortAnswerSection from "../ShortAnswerSection/ShortAnswerSection";
import SingleChoiceSection from "../SingleChoiceSection/SingleChoiceSection";
import MultiChoiceSection from "../MultiChoiceSection/MultiChoiceSection";
import { TypeAnswer, getState } from "@/shared/libs/utils";
import { addAnswer, getPage } from "@/shared/api/actionCreators/actionCreatorsCourse";
import { useAppDispatch, useAppSelector } from "@/shared/api/store";
import { storeConfig } from "../../api/store";


const SectionCard: FC<Section> = ({
    id,
    pageId,
    order,
    type,
    content,
    maxScore,
    score,
    variants,
    answer,
    answers
}) => {
    const { handleSubmit, register } = useForm<{ answer: string | string[] }>();
    const token = useAppSelector(state => state.auth.accessToken);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getPage(token, pageId || ''));
    }, []);

    const answerHandler: SubmitHandler<{ answer: string | string[] }> = ({ answer }) => {
        if (type === 'shortAnswer' && typeof answer === 'string') {
            dispatch(addAnswer(token, { shortAnswer: { answer, id } }));
        }

        if (type === 'choice' && typeof answer === 'string') {
            dispatch(addAnswer(token, { choice: { answer, id } }));
        }

        if (type === 'multiChoice' && Array.isArray(answer)) {
            dispatch(addAnswer(token, { multiChoice: { answer, id } }));
        }

        dispatch(getPage(token, pageId || ''));
    }

    return content
        ? <TextSection>{content}</TextSection>
        : type === 'shortAnswer'
            ? <ShortAnswerSection
                register={() => register('answer')}
                onSubmit={handleSubmit(answerHandler)}
                question={content}
                maxScore={maxScore}
                score={score}
                state={getState(maxScore, score)}
            />
            : type === 'choice'
                ? <SingleChoiceSection
                    register={() => register('answer')}
                    onSubmit={handleSubmit(answerHandler)}
                    question={content}
                    choices={variants}
                    maxScore={maxScore}
                    score={score}
                    state={getState(maxScore, score)}
                />
                : type === 'multiChoice'
                    ? <MultiChoiceSection
                        register={() => register('answer')}
                        onSubmit={handleSubmit(answerHandler)}
                        question={content}
                        choices={variants}
                        maxScore={maxScore}
                        score={score}
                        state={getState(maxScore, score)}
                    />
                    : <></>
}

export default SectionCard;
