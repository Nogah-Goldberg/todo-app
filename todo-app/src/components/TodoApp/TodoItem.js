/**
 * Created by Yoav Rosenbaum 304953128 and Nogah Goldberg 302365713.
 */
import React, { Component } from 'react';


class TodoItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toBeUpdated: false,
            text: this.props.text,
            isCompleted: false
        }

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleUpdateClick = this.handleUpdateClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleCompletedChecked = this.handleCompletedChecked.bind(this);
        this.handleDeleteClick= this.handleDeleteClick.bind(this);
    }

    handleUpdate(e) {
        e.preventDefault();
        this.props.onItemEdit(this.props.listID, this.props.itemID, this.state.text);
        this.setState({toBeUpdated: !this.state.toBeUpdated})

    }


    handleUpdateClick(e) {
        e.preventDefault();
        this.setState({toBeUpdated: !this.state.toBeUpdated})
    }

    handleTextChange(e) {
        e.preventDefault();
        this.setState({text: e.target.value});
    }

    handleDeleteClick(e){
        e.preventDefault();

        this.props.onItemDelete(this.props.itemID, this.props.listID);
    }
    handleCompletedChecked(e){
        e.preventDefault();
        this.props.toggleCompleted(this.props.listID, this.props.itemID);
    }
    render() {
        return (
            <div>
              <input type="checkbox" onClick={this.handleCompletedChecked} checked={this.props.isCompleted}/>
                {this.props.text}
                {this.props.listIsSelected ?
                    <i className="fa fa-pencil todo-button" onClick={this.handleUpdateClick} aria-hidden="true" title="Edit Todo Item "></i>
                    : null}
                {this.props.listIsSelected ?
                  <i className="fa fa-times todo-button" onClick={this.handleDeleteClick} aria-hidden="true" title="Remove Todo Item"></i>
                    : null}
                {this.state.toBeUpdated ?
                    <form onSubmit={this.handleUpdate}>
                      <input type="text" onChange={this.handleTextChange}/>
                        <input type="submit" value="Ok"/>
                    </form> : null}
            </div>
        )
    }
}

export default TodoItem;
