import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import './css/create_schedule_form.css'

class CreateSchedule extends Component {
	constructor(props){
		super(props)
		this.state = {enableDate : false} 
	}

	componentWillMount(){

	}

	componentWillUnmount(){

	}

	onChange(e) {
		this.setState({[e.target.name] : e.target.value})

		console.log(e.target.name)
		console.log(e.target.value)
		if(e.target.name == 'schedule-type'){
			if(e.target.value == 'default'){
				this.setState({enableDate : false})
			}else{
				this.setState({enableDate : true})
			}
		}
	}

	// Create schedule, there will be 2 types of schedule
	// 1. The default schedule - has no start time or end-time
	// 2. The periodic schedule - has start time and end time
	render = () => {
		return (
			<div id='create-schedule'>
				<form id='create-schedule-form' onSubmit={this.onSubmit}>
					<label for='schedule-name'>Schedule Name</label>
					<input class='form-control' placeholder='Schedule Name' type='text' id='schedule-name' name='schedule-name' onChange={this.onChange}/>

					<label for='schedule-type'>Schedule Type</label>
					<select id='schedule-type' class='form-control' name='schedule-type' onChange={this.onChange}>
						<option value='default' selected>Default</option>
						<option value='periodic'>Periodic</option>
					</select>

					<table id='schedule-time-table'>
						<tr>
							<td><label for='schedule-time-from'>From</label></td>
							<td class='date-input'>
								<input class ='form-control' disabled={!this.state.enableDate} type='date' id='schedule-time-from' name='schedule-time-from' onChange={this.onChange}/>
							</td>
						</tr>


						<tr>
							<td><label for='schedule-time-to'>To</label></td>
							<td class='date-input'>
								<input class='form-control' disabled={!this.state.enableDate} type='date' id='schedule-time-to' name='schedule-time-to' onChange={this.onChange}/>
							</td>
						</tr>
					</table>
					<p>{new String(this.state.enableDate)}</p>
				</form>
			</div>
		)
	}
}

export default CreateSchedule;
