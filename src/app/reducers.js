import { RECEIVE_TASKS, ADD_TASK, COMPLETE_TASK, LOGIN, LOGOUT } from './actions';

export default rootReducer;

const initialState = {
	tasks: []
};

// main (root) reducer function that handles all the actions based on types
// the initial state is passed so that the reducer returns a new state
// based on the action passed to it

function rootReducer(state = initialState, action) {
	switch(action.type) {
		case RECEIVE_TASKS:
			// return Object.assign({}, state, { tasks: action.payload.tasks });
			return getTasksReducer(state, action);
		case ADD_TASK:
			return addTaskReducer(state, action);
		case COMPLETE_TASK:
			return completeTaskReducer(state, action);
		case LOGIN:
		case LOGOUT:
			return Object.assign({}, state, { authentication: action.payload.authentication});
		default:
			return state;
	}

	return state;
}

function getTasksReducer(state, action) {
	const {tasks} = action.payload;
	return { ...state, tasks: tasks };
}

// spread operator use (...state.tasks) basically saying take the old state of tasks and update it
// with the new array of tasks 
function addTaskReducer(state, action) {
	// retrieve the payload from action
	var task = action.payload;
	// assign 'false' to the task's 'completed' property
	task.completed = false;

	// get id from last task in state array
	var lastTask = state.tasks[state.tasks.length - 1];

	// assign the new task the next id after the 'lastTask'
	task.id = lastTask.id++;
	
	// create a new object, add the current state and the new task
	return Object.assign({}, state, { tasks: [...state.tasks, task] });
}

function completeTaskReducer(state, action) {
	var id = action.payload.id;
	return Object.assign({}, state, { tasks: state.tasks.map(task => {
			if(id === task.id) {
				return Object.assign({}, task, { completed: true });
			}

			return task;
		})
	});
}

