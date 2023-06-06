import {FC, useState} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkPlugins = ReactMarkdown.propTypes.remarkPlugins;
import Checkbox from "../../components/Checkbox/Checkbox";
import TextSection from "../../components/TextSection/TextSection";
import QuestionBottom from "../../components/QuestionSectionBottom/QuestionBottom";
import ShortAnswerSection from "../../components/ShortAnswerSection/ShortAnswerSection";
import SingleChoiceSection from "../../components/SingleChoiceSection/SingleChoiceSection";
import MultiChoiceSection from "../../components/MultiChoiceSection/MultiChoiceSection";
import TopPanel from "../../components/TopPanel/TopPanel";
import courseImage from "../../images/kotlin.svg";
import profile from "../../images/кач.jpg";

const TestUIKit: FC = () => {

    const text = `# hello h1
## hello h2
### hello h3
#### hello h4
##### hello h5
###### hello h6
\`\`\`
hello code
hi
\`\`\`
hello p **bold** *italic* __underline__
* list
* list
* list
  * more list

hello

---

world

haha

> blockqoute

* [ ] todo
* [x] done

| header 1 | header 2 |
| - | - |
| body 1 | body 2 |
| body 3 | body 4 |

[Custom foo description](#foo)

`
    const question = `Какое число выведет следующий код:
\`\`\`
fun main() {
    var a = 2
    var b = 3
    println(a---b)
}
\`\`\`
`
    const a = [""]

    return <>
        <TopPanel
            image={courseImage}
            title="Основы программирования на Kotlin"
            username="андрей"
            profile={profile}
        />

        <ShortAnswerSection
            question={question}
            attempts={1}
            maxScore={100}
            state="initial"
        />

        <SingleChoiceSection
            question={question}
            choices={["2", "3", "4"]}
            attempts={1}
            maxScore={100}
            state="initial"
        />

        <MultiChoiceSection
            question={question}
            choices={["2", "3", "4"]}
            attempts={0}
            score={0}
            maxScore={100}
            state="incorrect"
        />

        <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {text}
        </ReactMarkdown>
        <TextSection>{text}</TextSection>
    </>
}

export default TestUIKit;