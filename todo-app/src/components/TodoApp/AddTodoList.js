/**
 * Created by Yoav Rosenbaum 304953128 and Nogah Goldberg 302365713.
 */
import React, { Component } from 'react';

class AddTodoList extends Component {

    constructor(props) {
        super(props)
        this.state = {title: ''}

        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleTextChange(e) {
        e.preventDefault();
        this.setState({title: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.title);
    }

    render() {

        return (
            <div className="row">
            <div className="col-sm-12">
                <span className="add-todo-list-title"> Add Todo List: </span>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Title..." onChange={this.handleTextChange} title="Add a new todo list" required/>
                    <button onClick={this.handleSubmit}>Add</button>
                </form>
            </div>
            </div>
        )
    }
}

export default AddTodoList;
