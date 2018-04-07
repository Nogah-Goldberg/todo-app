/**
 * Created by Yoav Rosenbaum 304953128 and Nogah Goldberg 302365713.
 */
import React, { Component } from 'react';

class ShareList extends Component {

    constructor(props){
        super(props)
        this.state = {selectedUser: ''}

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        e.preventDefault();

        this.props.onShare(this.state.selectedUser, this.props.listID);
    }

    handleChange(e){
        e.preventDefault();

        this.setState({selectedUser: e.target.value})
    }

    render() {
        var myUsers = this.props.users;
          // adding a dummy user to the list to be shown as default in dropdown
        var hasDummy = false;
        myUsers.forEach(function(item) {
          if(item.username === 'Select a user'){
            hasDummy = true;
          }
        });

        if (!hasDummy){
          myUsers.unshift({username: "Select a user"})
        }
        console.log(myUsers)
        const users = myUsers.map((user) => {
            return (
                <option value={user.username}>{user.username}</option>
            )
        })
        return (
            <div>
                <h4>Choose User: </h4>
                <select onChange={this.handleChange} id="select-user">
                    {users}
                </select>
                <button onClick={this.handleClick}>Share</button>



            </div>
        )
    }
}

export default ShareList;
