export const addNewTasks = (data) => {
    return {
        type: 'ADD_NEW_TASKS',
        payload: data,
    };
};

export const createTask = (data) => {
    return {
        type: 'CREATE_TASK',
        payload: data,
    };
};

export const toggleTodo = (data) => {
    return {
        type: 'TOGGLE_TODO',
        payload: data,
    };
};

export const deletedTask = (data) => {
    return {
        type: 'DELETED_TASK',
        payload: data,
    };
};

export const editTask = (data) => {
    return {
        type: 'EDIT_TASK',
        payload: data,
    };
};
