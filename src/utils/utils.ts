export type TypeAnswer = "initial" | "correct" | "partial" | "incorrect";

export const getPluralScore = (amount: number) => {
    const last = amount % 10
    const twoLast = amount % 100
    return last == 0 || last >= 5 ||
        twoLast >= 11 && twoLast <= 14
        ? "баллов"
        : last == 1
            ? "балла"
            : "баллов"
}

export const getPluralLeft = (amount: number) => {
    const last = amount % 10
    const twoLast = amount % 100
    return last == 0 || last >= 5 ||
        twoLast >= 11 && twoLast <= 14
        ? "Осталось"
        : last == 1
            ? "Осталась"
            : "Осталось"
}

export const getPluralAttempts = (amount: number) => {
    const last = amount % 10
    const twoLast = amount % 100
    return last == 0 || last >= 5 ||
        twoLast >= 11 && twoLast <= 14
        ? "попыток"
        : last == 1
            ? "попытка"
            : "попытки"
}

export const getTypeAnswer = (answer: string): TypeAnswer => {
    let state: TypeAnswer = 'initial';

    switch (answer) {
        case 'fun':
            state = 'correct'
            break;
        case 'main':
            state = 'correct'
            break;
        default:
            state = 'incorrect'
    }

    return state;

}