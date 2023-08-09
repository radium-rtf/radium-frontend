import { Card } from 'antd'
import { FC, FormEventHandler } from 'react'
import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import * as Icons from "../../icons/icons"
import BigTextField from '../BigTextField/BigTextField'
import Button from '../Button/Button'
import QuestionHeader from '../QuestionHeader/QuestionHeader'
import RadioButton from '../RadioButton/RadioButton'
import TextField from '../TextField/TextField'
import styles from './CheckAnswerSection.module.scss'
import CourseCard from '../CourseCard/CourseCard'

interface CheckAnswerSectionProps {
    register?: (name: string, options?: RegisterOptions) => UseFormRegisterReturn
    question?: string
    choices?: string[]
    attempts?: number
    onSubmit?: FormEventHandler<HTMLFormElement>
    onReset?: FormEventHandler<HTMLFormElement>
    text?: string;
    title?: string;
}

const CheckAnswerSection: FC<CheckAnswerSectionProps> = ({
    register,
    question,
    choices,
    attempts,
    onSubmit,
    onReset,
    text,
    title
}) =>
    <div className={styles.card}>
        <QuestionHeader type="task" />
        <h4>{title}</h4>
        <br />
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{question || ''}</ReactMarkdown>
        <BigTextField text={text} />
        {choices?.map((choice) =>
            <RadioButton
                register={register}
                label={choice}
                name="answer"
                value={choice}
            />
        )}
        <br />
        <div style={{ display: 'flex', justifyContent: 'space-between' }} >
            <TextField type='text' label='Комментарий' width={352} />
            <br />
            <Button
                label='Оценить'
                icon={Icons.Submit}
                color="accent"
                disabled={attempts == 0} />
        </div>
    </div>
export default CheckAnswerSection;