import React, {Component} from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import './css/create_schedule_form.css'

class ContextMenu extends Component {
	constructor(props){
		super(props)
		this.state = {}
		this.mouseLeave = this.mouseLeave.bind(this)
	}

	componentWillMount() {

	}

	componentWillUnmount() {

	}

	mouseLeave(){
		this.setState({'show_menu' : false})
	}

	showMenu(x, y, time, date){
		this.setState({
			'show_menu' : true,
			'current_time' : time,
			'current_date' : date,
			'xPos' : `${x}px`,
			'yPos' : `${y}px`,
		})
	}

	render = () => {
		if(this.state.show_menu){
			return (
				<div onMouseLeave={this.mouseLeave} style={{top:this.state.yPos, left:this.state.xPos}} id='context-menu'>
					<p>{this.state.current_date} - {this.state.current_time}</p>
					<li>
						<label for='activity'>Add Activity</label>
						<input id='activity' type='text' placeholder='Activity' className='form-control'/>
					</li>
					<li>Expand horizontally</li>
					<li>Expand vertically</li>
				</div>
			)
		}else{
			return null
		}
	}
}

export default ContextMenu;
