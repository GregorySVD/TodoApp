export const calcPercent =(TaskDone: number, AllTasks: number): string=> {
    if (TaskDone === 0) {
        return "0%"
    }
    return (TaskDone / AllTasks) * 100 + '%'
}
