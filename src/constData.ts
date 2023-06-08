import RadialProgress from "./components/RadialProgress/RadialProgress";

export const emailValidator: RegExp = /^([A-Za-z0-9_\-.])+(@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$)?/;


// const contents = [
//     {
//         title: "Знакомство с Kotlin",
//         value: "first-steps",
//         items: [
//             {
//                 title: "Установка ПО и создание проекта",
//                 description: "20 / 100 баллов",
//                 value: "soft-installation",
//                 icon: <RadialProgress progress={0.2} />,
//     },
//     {
//         title: "Вопросы для повторения",
//         description: "30 / 100 баллов",
//         value: "questions",
//         icon: <RadialProgress progress={0.3} />,
// },
// ],
// },
// {
//     title: "Основные концепты Kotlin",
//         value: "basics",
//     items: [
//     {
//         title: "Переменные",
//         description: "25 / 100 баллов",
//         value: "variables",
//         icon: <RadialProgress progress={0.25} />,
// },
//     {
//         title: "Примитивные типы данных",
//             description: "100 / 100 баллов",
//         value: "primitives",
//         icon: <RadialProgress progress={1} />,
//     },
//     {
//         title: "Функции",
//             description: "60 / 100 баллов",
//         value: "functions",
//         icon: <RadialProgress progress={0.6} />,
//     },
// ],
// },
// {
//     title: "Классы",
//         value: "classes",
//     items: [
//     {
//         title: "Строение класса",
//         description: "0 / 100 баллов",
//         value: "classes",
//         icon: <RadialProgress progress={0} />,
// },
//     {
//         title: "Классы данных",
//             description: "30 / 100 баллов",
//         value: "data-classes",
//         icon: <RadialProgress progress={0.3} />,
//     },
// ],
// },
// ]