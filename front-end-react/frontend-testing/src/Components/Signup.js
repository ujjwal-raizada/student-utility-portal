import React, {Component, Fragment} from "react" 
import axios from "axios"
import Header from './Header'

class Signup extends Component {
	
	state = {
			username: '' ,
			password: '' ,
			type: 'normal' ,
	}

	handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

	handleSubmit = (event) => {
		event.preventDefault()
		const data = this.state

		this.setState({
					placeholder: 'Submitting...'
				})

		axios.post('https://damp-fjord-85414.herokuapp.com/signup', data)
      	.then(res => {
      		const status = res.data.status
      		const message = res.data.message
      		if(status === 'success') {      			
  				this.setState({
      				placeholder: message
      			})
    			this.props.history.push(`/profile/${this.state.username}`)      			
      		}
      		else if(status === 'failure') {
      			this.setState({
      				placeholder: message
      			})
      		}
		})
		.catch(error => {
				console.log(error)
				this.setState({
				error: error ,
				placeholder: error.message
			})
		})   
	}
	
	render() {
		return (
			<Fragment>
				<Header page="Signup" />
				<div style = {{marginTop: '60px'}}>
					<h1 >Signup</h1>
					<p className="text-danger">{this.state.placeholder}</p>
					<form>

						<div>
							<label>
								Username:  
								<input 
									type="text" 
									name="username" 
									value={this.state.username}
									onChange={this.handleChange}
								/>
							</label>
							<br/>
							<br/>
						</div>

						<div>
							<label>
								Password:  
								<input 
									type="password" 
									name="password" 
									value={this.state.password} 
									onChange={this.handleChange}
								/>
							</label>
							<br/>
							<br/>
						</div>

						<div>
							<label>
								User Type:
								<select 
									value={this.state.type}
                  onChange={this.handleChange}
                  name="type" 
                	>
									<option value="normal">Student</option>
									<option value="admin">Admin</option>
								</select>
							</label>
							<br/>
							<br/>
						</div>	

						<div>
							<label>
								Description:<br/>
								<textarea name="Description" />
								<br/>
							</label>
							<br/>
						</div>											

						<div>
							<input 
								type="submit" 
								name="Submit" 
								onClick={this.handleSubmit}/>
							<br/>							
						</div>
					</form>
				</div>	
			</Fragment>				
 		)
	}
}

export default Signup