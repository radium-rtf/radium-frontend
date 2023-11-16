import { cn, Table, TableBodyRow, TableDataCell, TableHeaderCell } from "@/shared";
import { FC } from "react";
import { CourseReportDto } from "../model/courseReportDto";

interface CourseReportProps {
    courseReport: CourseReportDto;
}

export const GroupReportTable: FC<CourseReportProps> = ({ courseReport }) => {
    const createSubtext = (text: string) =>
        <div className="text-text-secondary text-[0.625rem] mt-[0.38rem]">
            {text}
        </div>;

    return (<Table
        headerRow={[
            <TableHeaderCell key='Имя' className="w-full text-text-primary text-sm">
                <p>Имя</p>
            </TableHeaderCell>,
            <TableHeaderCell key='Итог' className="text-center">
                <div className="w-full m-auto text-text-primary text-sm">
                    <p>Итог</p>
                </div>
                {createSubtext(`/ ${courseReport.header.maxScore}`)}
            </TableHeaderCell>,
            ...courseReport.header.values.map(section =>
                <TableHeaderCell key={section.name} className="text-center">
                    <div className={cn("text-center text-text-primary text-sm m-auto", section.isModule && "text-accent-primary-200")}>
                        {section.name}
                    </div>
                    {createSubtext((section.isModule ? 'глава' : '') + ' / ' + section.maxScore)}
                </TableHeaderCell>
            )]}
        bodyRows={courseReport.rows.map((row, rowIndex) => {
            return (<TableBodyRow
                key='Body'
                row={[
                    <TableDataCell key={row.user.name} value={row.user.name}>
                        <div>
                            {row.user.name}
                        </div>
                        {/* {createSubtext(row.user.fio)} */}
                    </TableDataCell>,
                    <TableDataCell key={row.score} value={row.score.toString()}>{row.score}</TableDataCell>,
                    ...row.values.map(value => <TableDataCell key={value} value={value.toString()}>{value}</TableDataCell>)]}
                rowIndex={rowIndex}
            />);
        })}
    />);
};