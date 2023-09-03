import { FC } from "react";
import Table from "@/shared/ui/Table/Table";
import { courses, statement } from "../../constData";
import CheckAnswerSection from "@/shared/ui/CheckAnswerSection/CheckAnswerSection";

const TestUIKit: FC = () => {

    return <div>
        <Table title='Имя' courses={courses} statement={statement} />

        <CheckAnswerSection />
    </div>
}

export default TestUIKit;