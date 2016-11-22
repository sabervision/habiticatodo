import fetch from 'isomorphic-fetch';

// action types
// export const GET_TASKS = 'GET_TASKS';
export const RECEIVE_TASKS = 'RECEIVE_TASKS';
export const ADD_TASK = 'ADD_TASK';
export const COMPLETE_TASK = 'COMPLETE_TASK';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

//================================================================
// placeholder data to mimic data to be received from API
// const tasks = [
// 	{
// 		id: 1,
// 		type: 'daily',
// 		text: 'Check Reddit',
// 		completed: false
// 	},
// 	{
// 		id: 2,
// 		type: 'habit',
// 		text: 'Walk up the stairs'
// 	},
// 	{
// 		id: 3,
// 		type: 'todo',
// 		text: 'Finish redux tutorial',
// 		completed: false
// 	},
// 	{
// 		id: 4,
// 		type: 'todo',
// 		text: 'Finish redux slides',
// 		completed: true
// 	}
// ];



// export function getTasks() {
// 	return {
// 		type: GET_TASKS,
// 		payload: {
// 			tasks
// 		}
// 	};
// }
//================================================================
// we must now convert the above action to an ASYNC action to retrieve from Habitica API

// async action creator that returns a promise
// when fulfilled, dispatches another action to 'receiveTasks'
export function fetchTasks() {

	return function(dispatch, getState) {
		let state = getState();

		if(!state.authentication || state.authentication.uuId.length === 0 ||
			state.authentication.apiToken.length === 0) {
			return function() {};
		}

		return fetch('https://habitica.com/api/v3/tasks/user', {
			headers: {
				'X-API-User': state.authentication.uuId,
				'X-API-Key': state.authentication.apiToken
			}
			})
			.then(response => response.json())
			.then((json) => {
				dispatch(receiveTasks(json));
			})
		;
	};
}

export function receiveTasks(tasks) {
	return {
		type: RECEIVE_TASKS,
		payload: {
			tasks
		}
	};
}

export function addTask(text, type) {
	return {
		type: ADD_TASK,
		payload: {
			text, 
			type
		}
	};
}

export function completeTask(id) {
	return {
		type: COMPLETE_TASK,
		payload: {
			id
		}
	}
}

export function login(uuId, apiToken) {
	return {
		type: LOGIN,
		payload: {
			authentication: {
				uuId,
				apiToken
			}
		}
	};

}

export function logout() {
	return {
		type: LOGOUT,
		payload: {
			authentication: {
				uuId: '',
				apiToken: ''
			}
		}
	};
}

