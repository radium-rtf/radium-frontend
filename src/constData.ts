import { IStatementUser } from "./interfaces/module.interface";
import { ITableStatement } from "./interfaces/table-statement.interface";

export const emailValidator: RegExp = /^([A-Za-z0-9_\-.])+(@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$)?/;

export const courses: string[] = [
    'Основы программирования котлин 1',
    'Основы программирования котлин 2',
    'Основы программирования котлин 3',
    'Основы программирования котлин 4'
]

export const statement: ITableStatement[] = [
    {
        name: 'Олежа',
        courses: [
            {
                course: 'Основы программирования котлин 1',
                score: 100
            },
            {
                course: 'Основы программирования котлин 2',
                score: 99
            },
            {
                course: 'Основы программирования котлин 3',
                score: 98
            },
            {
                course: 'Основы программирования котлин 4',
                score: 97
            }
        ]
    },
    {
        name: 'Олежа 2',
        courses: [
            {
                course: 'Основы программирования котлин 1',
                score: 100
            },
            {
                course: 'Основы программирования котлин 2',
                score: 99
            },
            {
                course: 'Основы программирования котлин 3',
                score: 98
            },
            {
                course: 'Основы программирования котлин 4',
                score: 97
            }
        ]
    },
    {
        name: 'Олежа 3',
        courses: [
            {
                course: 'Основы программирования котлин 1',
                score: 100
            },
            {
                course: 'Основы программирования котлин 2',
                score: 99
            },
            {
                course: 'Основы программирования котлин 3',
                score: 98
            },
            {
                course: 'Основы программирования котлин 4',
                score: 97
            }
        ]
    }
]

export const statementUser: IStatementUser[] = [
    {
        id: '1',
        title: 'абобус',
        description: '30/100',
        avatar: ''
    },  
    {
        id: '2',
        title: 'баба буй',
        description: '40/100',
        avatar: ''
    }, 
    {
        id: '3',
        title: 'пе довка',
        description: '45/100',
        avatar: ''
    }, 
]