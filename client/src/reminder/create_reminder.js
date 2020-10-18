import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/create_reminder_form.css'

class CreateReminder extends Component {
	constructor(props) {
		super(props)
		this.state = {'reminder-type' : 'recurring'}

		this.componentWillMount = this.componentWillMount.bind(this)
		this.componentWillUnmount = this.componentWillUnmount.bind(this)
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	componentWillMount() {

	}

	componentWillUnmount() {

	}

	onChange(e) {
		this.setState({[e.target.name] : e.target.value})
	}

	onSubmit(e) {
		if(this.state['reminder-date'] == null ||
			 this.state['reminder-time'] == null ||
			 this.state['reminder-title'] == null ){
			alert('Please fill out all the information')
		}else{
			var formData = new FormData()
			formData.append('reminder-title', this.state['reminder-title'])
			formData.append('reminder-type', this.state['reminder-type'])
			formData.append('reminder-date', this.state['reminder-date'])
			formData.append('reminder-time', this.state['reminder-time'])

			axios({
				method : 'post',
				data : formData,
				url : 'http://localhost:8080/reminder/create',
				headers : {
					'Content-Type' : 'multipart/form-data'
				}
			}).then(response => {
				if(response.data == 'success'){
					alert('Your reminder has been added successfully')
				}else if(response.data == 'fail'){
					alert('There was some problem inserting this reminder')
				}
			})
		}
	}

	render = () => {
		return (
			<div id='create-reminder'>
				<form id='create-reminder-form' onSubmit={this.onSubmit}>
					<label for='reminder-title'>Reminder Title</label>
					<input className='form-control' placeholder='Reminder Title' name='reminder-title' id='reminder-title' type='text' onChange={this.onChange}/>

					<label for='reminder-type'>Reminder Type</label>
					<select className='form-control'  name='reminder-type' id='reminder-type' onChange={this.onChange}>
						<option value='recurring' selected>Recurring</option>
						<option value='one-time'>One Time</option>
					</select>

					<table>
						<tr>
							<td>
								<label for='reminder-date'>Reminder Date</label>
								<input className='form-control' placeholder='Reminder Date' name='reminder-date' id='reminder-date' type='date' onChange={this.onChange}/>
							</td>
							<td>
								<label for='reminder-time'>Reminder Time</label>
								<input className='form-control' placeholder='Reminder Time' name='reminder-time' id='reminder-time' type='time' onChange={this.onChange}/>
							</td>
						</tr>
					</table>
					<Button onClick={this.onSubmit} id='submit'>Add Reminder</Button>
				</form>
			</div>
		)
	}
}

export default CreateReminder;
