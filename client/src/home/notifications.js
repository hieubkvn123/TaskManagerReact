import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/notifications.css'
import $ from 'jquery'
import { fadeIn, fadeOut } from 'react-animations'
import Radium, { StyleRoot } from 'radium'

class Notification extends Component {
	constructor(props){
		super(props)
		this.componentWillMount = this.componentWillMount.bind(this)
		this.state = {hidden : false}
	}

	componentWillMount(){
		// check the server the current schedule and coming activities
		axios({
			method : 'post',
			url : 'http://localhost:8080/scheduler/get_current_activity',
			headers : {
				'Content-Type' : 'multipart/form-data'
			}
		}).then(response => {
			this.setState({current_activity : response.data})
		}).catch(err => {
			console.log(err)
		})

		setTimeout(() => {
			this.setState({hidden : true})
		}, 2000)
	}

	componentWillUnmount(){
	}

	render = () => {
		const styles = {
			fadeIn : {
				animation : 'x 2s infinite',
				animationName : Radium.keyframes(fadeIn, 'fadeIn')
			}, 

			fadeOut : {
				animation : 'x 2s',
				animationName : Radium.keyframes(fadeOut, 'fadeOut')
			}
		}
	
		return (
				<div className='notification-bar' id='home-notification-bar' hidden={this.state.hidden}>
					<StyleRoot>
						<div className='notification-item' style={styles.fadeIn} id='item-1'>
							<span>{this.state.current_activity}</span>
						</div>	
					</StyleRoot>
				</div>
		)
	}
}

export default Notification
