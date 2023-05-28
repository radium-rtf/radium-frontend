export interface IMenu {
    label: string,
    path: string,
}

export const menus: IMenu[] = [
    {
        label: 'Профиль',
        path: '/profile'
    },
    {
        label: 'Мои курсы',
        path: '/mycourses'
    },
    {
        label: 'Выйти',
        path: '/logout'
    }
]
