import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class EditMeetup extends Component{
    constructor(props){
        super(props);
        this.state = {
            id:'',
            name:'',
            city:'',
            Address:''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount(){
        this.getMeetupDetails();
    }


    //gets the id from the url
    getMeetupDetails(){
        let meetupId = this.props.match.params.id
        axios.get(`http://localhost:3000/api/meetups/${meetupId}`)
        .then(response => {
            //response puts data into a data obj
            //must call response.data to get db records
            //set state with the state parameter & data
            this.setState({
                id: response.data.id,
                name: response.data.name,
                city: response.data.city,
                Address: response.data.Address,
            }, () => {console.log(this.state)});
        })
        .catch(err => console.log(err));
    }

    editMeetup(newMeetup){
        axios.request({
            method: 'put',
            url: `http://localhost:3000/api/meetups/${this.state.id}`,
            data: newMeetup
        }).then(response => {
            this.props.history.push('/');
        }).catch(err => console.log(err));
    }


    onSubmit(e){
        const newMeetup = {
            name: this.refs.name.value,
            city: this.refs.city.value,
            Address: this.refs.Address.value
        }
        this.editMeetup(newMeetup);
        e.preventDefault();
    }

    
    //[name] is a place holder here
    //functiont akes in an event
    handleInputChange(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render(){
        return (
            <div>
                <br />
                <Link className= "btn grey" to="/">Back</Link>
                <h1>Edit Meetup</h1>
                <form onSubmit={this.onSubmit.bind(this)}>
                    {/* input-field is a materialize class */}
                    {/* ref is how the info all access the on submit */}
                    <div className="input-field">
                        <input type="text" name="name" ref="name"  
                        onChange={this.handleInputChange} value={this.state.name}/>
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="city" ref="city" 
                         onChange={this.handleInputChange} value={this.state.city}/>
                        <label htmlFor="city">City</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="Address" ref="Address" 
                        onChange={this.handleInputChange} value={this.state.Address}/>
                        <label htmlFor="Address">Address</label>
                    </div>
                    <input type="submit" value="Save" className="btn" />
                </form>
            </div>
    )
    }

}
export default EditMeetup;