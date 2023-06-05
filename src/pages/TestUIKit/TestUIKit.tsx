import {FC, useState} from "react";
import Checkbox from "../../components/Checkbox/Checkbox";
import RadioButton from "../../components/Radio/RadioButton";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import * as Icons from "../../icons/icons";
// import Switch from "../../components/Switch/Switch";
// import LinearProgress from "../../components/LinerProgress/LinearProgress";
// import RadialProgress from "../../components/RadialProgress/RadialProgress";
// import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
// import profile from "../../images/кач.jpg"
// import MenuItem from "../../components/MenuItem/MenuItem";
// import List from "../../components/List/List";
// import Card from "../../components/Card/Card";
// import CourseCard from "../../components/CourseCard/CourseCard";
// import course from "../../images/kotlin.svg";
// import TextField from "../../components/text-field/TextField";

const TestUIKit: FC = () => {
    const [visible, setVisible] = useState(false)


    return (
        <div>
            
        </div>
    )
    // const list = [
    //     {
    //         title: "Первые шаги",
    //         value: "first-steps",
    //         items: [
    //             {
    //                 title: "Знакомство с Kotlin. Первая программа",
    //                 description: "123 / 256 баллов",
    //                 value: "first-program",
    //                 icon: <RadialProgress progress={0.5} />,
    //             },
    //             {
    //                 title: "Переменные. Мутабельность",
    //                 description: "123 / 256 баллов",
    //                 value: "variables",
    //                 icon: <RadialProgress progress={0.5} />,
    //             },
    //             {
    //                 title: "Примитивные типы данных",
    //                 description: "0 / 123 баллов",
    //                 value: "primitives",
    //                 icon: <RadialProgress progress={0} />,
    //             },
    //         ],
    //     },
    //     {
    //         title: "Функции",
    //         value: "functions",
    //         items: [
    //             {
    //                 title: "Знакомство с функциями",
    //                 description: "0 / 123 баллов",
    //                 value: "functions",
    //                 icon: <RadialProgress progress={0} />,
    //             },
    //             {
    //                 title: "Ключевое слово vararg",
    //                 description: "0 / 123 баллов",
    //                 value: "vararg",
    //                 icon: <RadialProgress progress={0} />,
    //             },
    //             {
    //                 title: "Inline-функции",
    //                 description: "123 / 256 баллов",
    //                 value: "inline-functions",
    //                 icon: <RadialProgress progress={0.5} />,
    //             },
    //             {
    //                 title: "Функции-расширения",
    //                 description: "123 / 256 баллов",
    //                 value: "extension-functions",
    //                 icon: <RadialProgress progress={0.5} />,
    //             },
    //         ],
    //     },
    //     {
    //         title: "Классы",
    //         value: "classes",
    //         items: [
    //             {
    //                 title: "Что такое класс",
    //                 description: "123 / 256 баллов",
    //                 value: "class",
    //                 icon: <RadialProgress progress={0.5} />,
    //             },
    //             {
    //                 title: "Конструкторы",
    //                 description: "123 / 256 баллов",
    //                 value: "constructors",
    //                 icon: <RadialProgress progress={0.5} />,
    //             },
    //             {
    //                 title: "Свойства",
    //                 description: "123 / 256 баллов",
    //                 value: "properties",
    //                 icon: <RadialProgress progress={0.5} />,
    //             },
    //         ],
    //     },
    // ];

    // return (
    //     <div>
    //         <Header
    //             className='header'
    //             title='Kotlin'
    //         />
    //         <Button
    //             style="accent"
    //             icon={Icons.Visible}
    //             label="ABCDEFabcdef"
    //             onClick={() => console.log("huy")}
    //         />
    //         <Button
    //             style="destructive"
    //             width="256px"
    //             icon={<RadialProgress progress={0.6} />}
    //             label="ABCDEFabcdef"
    //             onClick={() => console.log("huy")}
    //         />
    //         <Button
    //             style="outlined"
    //             icon={Icons.Invisible}
    //             label="ABCDEFabcdef"
    //             onClick={() => console.log("huy")}
    //         />

    //         <Checkbox
    //             label="hhohohohoh"
    //             onInput={console.log}
    //         />

    //         <Switch
    //             label="bibibi dododo yjakjdkja"
    //         />

    //         <form>
    //             <RadioButton
    //                 label="haha yes"
    //                 name="thing"
    //                 value="yes"
    //             />
    //             <RadioButton
    //                 label="haha no"
    //                 name="thing"
    //                 value="no"
    //             />
    //             <RadioButton
    //                 label="haha maybe"
    //                 name="thing"
    //                 value="maybe"
    //             />
    //         </form>

    //         <TextField
    //             label="OMg omg omg"
    //             type="email"
    //             postfix="@urfu.me"
    //             width="256px"
    //         />

    //         <TextField
    //             label="PASSWORD!!!!!"
    //             type="password"
    //             icon={visible ? Icons.Visible : Icons.Invisible}
    //             width={256}
    //             onIconClick={() => setVisible(!visible)}
    //         />

    //         <LinearProgress
    //             color="primary"
    //             progress={0.5}
    //             showPercentage={true} />

    //         <RadialProgress progress={0.75} />

    //         <ProfilePicture image={profile} />

    //         <MenuItem
    //             icon={<ProfilePicture image={profile} />}
    //             iconSize="large"
    //             label="omg omg omg"
    //             onClick={() => console.log("omfodsfj")}
    //         />

    //         <CourseCard
    //             name="Основы программирования на Kotlin"
    //             image={course}
    //             state="discover"
    //             description="Курс предназначен для студентов, намеренных изучить основы Android-, backend-
    //             и кроссплатформенной разработки на Kotlin - мультипарадигменном языке программирования,
    //             созданном компанией JetBrains."
    //             topic="24 темы, 5 месяцев"
    //             width="480px"
    //             onClick={() => console.log("clicked card")}
    //             onButtonClick={() => console.log("clicked button")}
    //         />

    //         <CourseCard
    //             name="Основы программирования на Kotlin"
    //             image={course}
    //             state="continue"
    //             progress={0.53490852}
    //             topic="Следующая тема: Классы данных"
    //             width="480px"
    //             onClick={() => console.log("clicked card")}
    //             onButtonClick={() => console.log("clicked button")}
    //         />

    //         <CourseCard
    //             name="Основы программирования на Kotlin"
    //             image={course}
    //             state="checked"
    //             title="Классы данных - 7 / 10 баллов"
    //             subtitle="Классы и наследование"
    //             checkerName="Иван Иванов"
    //             profileImage={profile}
    //             comment="Неплохая работа, но непонятно, откуда взялось число 69420 на 3 строке.
    //             Также слишком много лишних комментариев."
    //             width="480px"
    //             onClick={() => console.log("clicked card")}
    //             onButtonClick={() => console.log("clicked button")}
    //         />

    //         <CourseCard
    //             name="Основы программирования на Kotlin"
    //             image={course}
    //             state="deadline"
    //             title="Свойства - 9 июня"
    //             subtitle="Классы и наследование"
    //             width="480px"
    //             onClick={() => console.log("clicked card")}
    //             onButtonClick={() => console.log("clicked button")}
    //         />

    //         <List
    //             items={list}
    //             width="256px"
    //             onSelected={console.log}
    //         />
    //     </div>

    // )
}

export default TestUIKit;