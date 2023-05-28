import profile from "../images/profile.svg"
import myCourses from "../images/courses.svg"
import exit from "../images/exit.svg"

export interface IMenu {
    label: string,
    path: string,
    image: string,
}

export const menus: IMenu[] = [
    {
        label: 'Профиль',
        path: '/profile',
        image: profile,
    },
    {
        label: 'Мои курсы',
        path: '/mycourses',
        image: myCourses,
    },
    {
        label: 'Выйти',
        path: '/logout',
        image: exit,
    }
]
