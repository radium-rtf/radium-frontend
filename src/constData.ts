import { IStatementUser } from "./interfaces/module.interface";
import { ITableStatement } from "./interfaces/table-statement.interface";

export const emailValidator: RegExp = /^([A-Za-z0-9_\-.])+(@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$)?/;

export const courses: string[] = [
    'Основы программирования на котлин 1',
    'Основы программирования на котлин 2',
    'Основы программирования на котлин 3',
    'Основы программирования на котлин 4',
    'Основы программирования на котлин 5',
    'Основы программирования на котлин 6',
    'Основы программирования на котлин 7',
    'Основы программирования на котлин 8'
]

export const statement: ITableStatement[] = [
    {
        name: 'абобус',
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
            },
            {
                course: 'Основы программирования котлин 5',
                score: 97
            },
            {
                course: 'Основы программирования котлин 6',
                score: 97
            },
            {
                course: 'Основы программирования котлин 7',
                score: 97
            },
            {
                course: 'Основы программирования котлин 8',
                score: 97
            }
        ]
    },
    {
        name: 'баба буй',
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
            },
            {
                course: 'Основы программирования котлин 5',
                score: 97
            },
            {
                course: 'Основы программирования котлин 6',
                score: 97
            },
            {
                course: 'Основы программирования котлин 7',
                score: 97
            },
            {
                course: 'Основы программирования котлин 8',
                score: 97
            }
        ]
    },
    {
        name: 'пе довка',
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
            },
            {
                course: 'Основы программирования котлин 5',
                score: 97
            },
            {
                course: 'Основы программирования котлин 6',
                score: 97
            },
            {
                course: 'Основы программирования котлин 7',
                score: 97
            },
            {
                course: 'Основы программирования котлин 8',
                score: 97
            }
        ]
    }
]

export const statementUser: IStatementUser[] = [
    {
        id: '1',
        title: 'Ведомость',
        avatar: ''
    },  
    {
        id: '2',
        title: 'абобус',
        description: '30/100',
        avatar: ''
    },  
    {
        id: '3',
        title: 'баба буй',
        description: '40/100',
        avatar: ''
    }, 
    {
        id: '4',
        title: 'пе довка',
        description: '45/100',
        avatar: ''
    }, 
]