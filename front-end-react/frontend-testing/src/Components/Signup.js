import React, {Component, Fragment} from "react" 
import axios from "axios"
import Header from './Header'

class Signup extends Component {
	
	state = {
			username: '' ,
			password: '' ,
			Accepted: false ,
			Gender: '' ,
			Fruit: '' ,
			placeholder: ''
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
		const user = {
			
			    'username': this.state.username,
			    'password': this.state.password
			
		}

		this.setState({
					placeholder: 'Submitting...'
				})

		axios.post('https://damp-fjord-85414.herokuapp.com/signup', user)
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
						</div>

						<div>
							<label>
								Password:  
								<input 
									type="text" 
									name="password" 
									value={this.state.password} 
									onChange={this.handleChange}
								/>
							</label>
							<br/>
						</div>

						<div>
							<textarea name="Description" />
							<br/>
						</div>

						<div>
							<input 
								type="text" 
								name="test" 
								placeholder="Placeholder"
							/>
							<br/>
							<br/>
						</div>

						<div>
							<select 
								value={this.state.Fruit}
			                    onChange={this.handleChange}
			                    name="Fruit" 
		                    >
								<option value="grapefruit">Grapefruit</option>
								<option value="lime">Lime</option>
								<option value="coconut">Coconut</option>
								<option value="mango">Mango</option>
							</select>
							<br/>
							<br/>
						</div>

						<h4>Gender:</h4>
						<div>
							<label>							
								<input 
									type="radio" 
									name="Gender" 
									value="Male" 
									checked={this.state.Gender === "Male"} 
									onChange={this.handleChange} 
								/>
								Male
							</label>
							<br/>
						</div>

						<div>
							<label>							
								<input 
									type="radio" 
									name="Gender" 
									value="Female" 
									checked={this.state.Gender === "Female"} 
									onChange={this.handleChange} 
								/>
								Female
							</label>
							<br/>
						</div>

						<div>
							<label>
								Accepted:
								<input 
									type="checkbox" 
									name="Accepted" 
									checked={this.state.Accepted} 
									onChange={this.handleChange} />
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