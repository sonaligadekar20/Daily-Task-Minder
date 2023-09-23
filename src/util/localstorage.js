export const saveListToLocalStorage = (tasks) => {
    localStorage.setItem('task-minder', JSON.stringify(tasks))
}