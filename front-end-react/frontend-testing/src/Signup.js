import React, {Component, Fragment} from "react" 
import Header from './Header'

class Signup extends Component {
	
	state = {
			Name: "" ,
			Age: "" ,
			Accepted: false ,
			Gender: "" ,
			Fruit: "lime"
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
		alert(this.state.Name + " " +this.state.Age)
	}
	render() {
		return (
			<Fragment>
				<Header />
				<form>

					<div>
						<label>
							Name:  
							<input type="text" name="Name" value={this.state.Name} onChange={this.handleChange}/>
						</label>
						<br/>
					</div>

					<div>
						<label>
							Age:  
							<input type="number" name="Age" value={this.state.Age} onChange={this.handleChange}/>
						</label>
						<br/>
					</div>

					<div>
						<textarea name="Description" />
						<br/>
					</div>

					<div>
						<input type="text" name="test" placeholder="Placeholder" />
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
							<input type="radio" name="Gender" value="Male" checked={this.state.Gender === "Male"} onChange={this.handleChange} />
							Male
						</label>
						<br/>
					</div>

					<div>
						<label>							
							<input type="radio" name="Gender" value="Female" checked={this.state.Gender === "Female"} onChange={this.handleChange} />
							Female
						</label>
						<br/>
					</div>

					<div>
						<label>
							Accepted:
							<input type="checkbox" name="Accepted" checked={this.state.Accepted} onChange={this.handleChange} />
						</label>
						<br/>
					</div>

					<div>
						<input type="submit" name="Submit" onClick={this.handleSubmit}/>
						<br/>
					</div>
				</form>

			</Fragment>				
 		)
	}
}

export default Signup