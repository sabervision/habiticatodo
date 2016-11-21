import fetch from 'isomorphic-fetch';
import { uuId, apiToken } from './config';

// action types
// export const GET_TASKS = 'GET_TASKS';
export const RECEIVE_TASKS = 'RECEIVE_TASKS';
export const ADD_TASK = 'ADD_TASK';
export const COMPLETE_TASK = 'COMPLETE_TASK';

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
// we must now convert the above action to an ASYNC action to retrieve from Habitca API

// async action creator that returns a promise
// when fulfilled, dispatches another action to 'receiveTasks'
export function fetchTasks() {

	return function(dispatch) {
		return fetch('https://habitica.com/api/v3/tasks/user', {
			headers: {
				'X-API-User': uuId,
				'X-API-Key': apiToken
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