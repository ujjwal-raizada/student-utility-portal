import React, {Component, Fragment} from "react" 
import axios from "axios"
import Header from './Header'

class AdminPage extends Component {

	state = {
			heading: '',
			notice: '',
			username: '' ,
			password: '' ,
			tag1: false ,
			tag2: false ,
			tag3: false ,
			tag4: false ,
			tag5: false ,
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

		axios.post('http://localhost:8080/admin/notice', user)
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
				<Header page="AdminPage" />
				<div style = {{marginTop: '60px'}}>
					<h1 >Post Notice</h1>
					<p className="text-danger">{this.state.placeholder}</p>
					<form>
					
						<div>
							<input 
								type="text"
								style={{width: '600px'}} 
								name="heading" 
								placeholder="Heading"
								value={this.state.heading}
								onChange={this.handleChange}
							/>
							<br/>
							<br/>
						</div>

						<div>
							<textarea
								style={{height: '200px' , width: '600px'}} 
								name="notice"
								placeholder='Notice'
								value={this.state.notice}
								onChange={this.handleChange}
								/>
							<br/>
						</div>				

						<div>
							<label>
								<input 
									type="checkbox" 
									name="tag1" 
									checked={this.state.tag1} 
									onChange={this.handleChange} 
									/>
								tag1
							</label>
							<br/>
						</div>

						<div>
							<label>
								<input 
									type="checkbox" 
									name="tag2" 
									checked={this.state.tag2} 
									onChange={this.handleChange} 
									/>
								tag2
							</label>
							<br/>
						</div>

						<div>
							<label>
								<input 
									type="checkbox" 
									name="tag3" 
									checked={this.state.tag3} 
									onChange={this.handleChange} 
									/>
								tag3
							</label>
							<br/>
						</div>

						<div>
							<label>
								<input 
									type="checkbox" 
									name="tag4" 
									checked={this.state.tag4} 
									onChange={this.handleChange} 
									/>
								tag4
							</label>
							<br/>
						</div>

						<div>
							<label>
								<input 
									type="checkbox" 
									name="tag5" 
									checked={this.state.tag5} 
									onChange={this.handleChange} 
									/>
								tag5
							</label>
							<br/>
						</div>

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
									type="password" 
									name="password" 
									value={this.state.password} 
									onChange={this.handleChange}
								/>
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
export default AdminPage