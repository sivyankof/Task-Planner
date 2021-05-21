const initialState = {
    priorityLow: [],
    priorityMiddle: [],
    priorityHigh: [],
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_NEW_TASKS':
            return addNewTasks({ ...state }, action);

        case 'CREATE_TASK':
            return addTask({ ...state }, action);

        case 'TOGGLE_TODO':
            return toggleTask({ ...state }, action);

        case 'DELETED_TASK':
            return deletedTask({ ...state }, action);

        case 'EDIT_TASK':
            return editTask({ ...state }, action);

        default:
            return { ...state };
    }
};

const addNewTasks = (state, action) => {
    action.payload.forEach((el) => {
        const name = el.name;
        const checked = el.checked;
        const id = el._id;

        return state[el.type].name !== name
            ? state[el.type].push({ name, checked, id })
            : '';
    });
    return state;
};

const addTask = (state, action) => {
    const { name, checked, type } = action.payload;

    state[type].push({ name, checked });

    return state;
};

const toggleTask = (state, action) => {
    const { name, type } = action.payload;

    state[type].map((el, i) => {
        return el.name === name ? (el.checked = !el.checked) : '';
    });


    return state;
};

const deletedTask = (state, action) => {
    const { name, type } = action.payload;

    let index = state[type].findIndex((el) => el.name === name);

    state[type].splice(index, 1);

    return state;
};

const editTask = (state, action) => {
    const { prevState, newState, type } = action.payload;

    state[type].forEach((el, i) => {
        if (el.name === prevState) {
            state[type][i].name = newState;
        }
    });
    return state;
};

export default taskReducer;
