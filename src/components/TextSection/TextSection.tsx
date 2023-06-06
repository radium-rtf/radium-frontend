import {FC} from "react"
import Card from "../Card/Card"
import ReactMarkdown from "react-markdown"

const TextSection: FC<{children: string}> = ({
    children,
}) => <Card>
    <ReactMarkdown>{children}</ReactMarkdown>
</Card>

export default TextSection