import React, {Component} from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import './css/create_schedule_form.css'

class ContextMenu extends Component {
	constructor(props){
		super(props)
		this.state = {}
		this.mouseLeave = this.mouseLeave.bind(this)
		this.onExpandHorizontal = this.onExpandHorizontal.bind(this)
	}

	componentWillMount() {

	}

	componentWillUnmount() {

	}

	mouseLeave(){
		this.state.ref.forceUpdate()
		this.setState({'show_menu' : false})
	}

	onExpandHorizontal = () => {
		for ( var i = 0; i < this.state.ref.state.activities[this.state.date_id].length; i++){
			this.state.ref.state.activities[this.state.date_id][i] = this.state.current_activity
		}

		this.state.ref.forceUpdate()
	}

	onExpandVertical = () => {
		for (var i = 0; i < this.state.ref.state.activities.length; i++){
			this.state.ref.state.activities[i][this.state.time_id] = this.state.current_activity
		}

		this.state.ref.forceUpdate()
	}

	showMenu(x, y, time, date, ref, current_activity){
		this.setState({
			'show_menu' : true,
			'current_time' : time,
			'current_date' : date,
			'xPos' : `${x}px`,
			'yPos' : `${y}px`,
			'date_id' : ref.state.current_date,
			'time_id' : ref.state.current_time,
			'ref' : ref,
			'current_activity' : current_activity
		})
	}

	onChange = (e) => {
		e.preventDefault()

		// Change both the activities array and current activity because it is necessary 
		// if we have to expand that activity either horizontally or vertically
		this.state.ref.state.activities[this.state.date_id][this.state.time_id] = e.target.value
		this.state.current_activity = e.target.value

		/* ref.forceUpdate() will force the state of a component to update itself */
		this.state.ref.forceUpdate()
	}

	render = () => {
		if(this.state.show_menu){
			return (
				<div onMouseLeave={this.mouseLeave} style={{top:this.state.yPos, left:this.state.xPos}} id='context-menu'>
					<p>{this.state.current_date} - {this.state.current_time}</p>
					<li>
						<label for='activity'>Add Activity</label>
						<input id='activity' type='text'  placeholder='Activity' onChange={this.onChange} className='form-control' defaultValue={this.state.current_activity} autoFocus/>
					</li>
					<li onClick={this.onExpandHorizontal}>Expand horizontally</li>
					<li onClick={this.onExpandVertical}>Expand vertically</li>
				</div>
			)
		}else{
			return null
		}
	}
}

export default ContextMenu;
