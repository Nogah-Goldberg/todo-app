/**
 * Created by Yoav Rosenbaum 304953128 and Nogah Goldberg 302365713.
 */
import React, { Component } from 'react';

class AddTodo extends Component {

    constructor(props){
        super(props)
        this.state = {text: ''}

        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleSubmit= this.handleSubmit.bind(this)
    }

    handleTextChange(e) {
        e.preventDefault();
        this.setState({text: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.props.listID, this.state.text);
    }

    render() {

        return (
            <div className="row">
            <div className="col-sm-12 add-todo-div">
              <span>Add Todo Item:</span>
              <form onSubmit={this.handleSubmit}>
                <input type="text" className="add-todo-item" onChange={this.handleTextChange} />
                  <button onClick={this.handleSubmit}>Add</button>
              </form>
            </div>

            </div>
        )
    }
}

export default AddTodo;
