import { FC } from "react";
import Table from "../../components/Table/Table";
import { courses, statement } from "../../constData";

const TestUIKit: FC = () => {

    return <div>
        <Table title='Имя' courses={courses} statement={statement} />
    </div>
}

export default TestUIKit;