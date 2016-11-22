import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchTasks, completeTask } from './actions';
import TaskList from './taskList';
import Navigation from './nav';

class App extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { dispatch } = this.props;

		dispatch(fetchTasks());
	}

	// user triggers a completeTask scenario
	// this function dispatches the action 'COMPLETE_TASK' 
	// completeTask action returns an 'id' in payload 
	// that is sent to reducers that modifies the state
	// new state enters the store, and the store notifies
	// everything connected to store of the new state
	// new state goes through the select function below and 
	// are then accessible in the view layer below  
	handleCompleteTask(task) {
		const { dispatch } = this.props;

		dispatch(completeTask(task.id));
	}
	render() {
		const { dispatch, habits, dailies, todos  } = this.props;

		return (
			<div className="container">
				<Navigation />
				<section>
					<h3>Habits</h3>
					<TaskList 
						onCompleteTask = { (task) => this.handleCompleteTask(task) }
						tasks={habits}
						type="habit" />
				</section>
				<section>
					<h3>Dailies</h3>
					<TaskList 
						onCompleteTask = { (task) => this.handleCompleteTask(task) }
						tasks={dailies}
						type="daily" />
				</section>
				<section>
					<h3>To-Dos</h3>
					<TaskList 
						onCompleteTask = { (task) => this.handleCompleteTask(task) }
						tasks={todos} 
						type="todo" />
				</section>

			</div>
		);
	}
}

function select(state) {
	return {
		habits: state.tasks.filter(task => task.type === 'habit'),
		dailies: state.tasks.filter(task => task.type === 'daily'),
		todos: state.tasks.filter(task => task.type === 'todo' && !task.completed)
	}
}

// connect 'App' component to redux
export default connect(select)(App);