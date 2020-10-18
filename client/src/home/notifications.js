import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/notifications.css'
import { fadeInDown, fadeOutUp} from 'react-animations'
import Radium, { StyleRoot } from 'radium'

class Notification extends Component {
	constructor(props){
		super(props)

		this.componentWillMount = this.componentWillMount.bind(this)
		this.onMouseEnter = this.onMouseEnter.bind(this)
		this.onMouseLeave = this.onMouseLeave.bind(this)
		this.state = {hidden : false}
	}

	componentWillMount(){
		this.setState({'animation' : {
				animation : 'x 2s',
				animationName : Radium.keyframes(fadeInDown, 'fadeInDown')
			}
		})

		this.setState({'timeout' : setTimeout(() => {
				// After 2 seconds, apply the fade out animation
				this.setState({'animation' : {
					animation : 'x 2s',
					animationName : Radium.keyframes(fadeOutUp, 'fadeOutUp')
				}})

				// Then make the box disappear after 2 seconds
				setTimeout(() => {
					this.setState({'hidden' : true})
				}, 2000)
			}, 3000)
		})
	}

	onMouseEnter(e) {
		clearTimeout(this.state.timeout)
	}

	onMouseLeave(e) {
		this.setState({'timeout' : setTimeout(() => {
				// After 2 seconds, apply the fade out animation
				this.setState({'animation' : {
					animation : 'x 2s',
					animationName : Radium.keyframes(fadeOutUp, 'fadeOutUp')
				}})

				// Then make the box disappear after 2 seconds
				setTimeout(() => {
					this.setState({'hidden' : true})
				}, 2000)
			}, 3000)
		})
	}

	componentWillUnmount(){
	}

	render = () => {
		return (
				<div className='notification-bar' id='home-notification-bar' 
					hidden={this.state.hidden} 
					onMouseEnter={this.onMouseEnter} 
					onMouseLeave={this.onMouseLeave}
					style={{
						bottom : this.props.bottom + "vh"
					}}
				>
					<StyleRoot>
						<div className={`notification-item ${this.props.type}`} style={this.state.animation} id='item-1'>
							<span>
							{
								this.props.text.split('\n').map((value, index)=>{
									var notification_id = 'info'
									if(index == 0){
										notification_id = 'header'
									}
									return (<span id={notification_id}>{value}<br/></span>)
								})
							}
							</span>
						</div>	
					</StyleRoot>
				</div>
		)
	}
}

export default Notification
