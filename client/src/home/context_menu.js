import React, {Component} from 'react'
import './css/create_schedule_form.css'

class ContextMenu extends Component {
	constructor(props){
		super(props)
		this.state = {}
	}

	componentWillMount() {

	}

	componentWillUnmount() {

	}

	showMenu(x, y){
		this.setState({
			'show_menu' : true,
			'xPos' : `${x}px`,
			'yPos' : `${y}px`
		})
	}

	hideMenu(){
		this.setState({'show_menu':false})
	}

	render = () => {
		if(this.state.show_menu){
			return (
				<div style={{top:this.state.yPos, left:this.state.xPos}} id='context-menu'>
					<li>{this.state.xPos}</li>
					<li>{this.state.yPos}</li>
					<li>Item 3</li>
				</div>
			)
		}else{
			return null
		}
	}
}

export default ContextMenu;
