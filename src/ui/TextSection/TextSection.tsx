import {FC} from "react"
import Card from "../Card/Card"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const TextSection: FC<{children: string}> = ({
    children,
}) => <Card>
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {children}
    </ReactMarkdown>
</Card>

export default TextSection