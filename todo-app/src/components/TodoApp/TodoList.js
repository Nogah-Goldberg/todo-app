/**
 * Created by Yoav Rosenbaum 304953128 and Nogah Goldberg 302365713.
 */
import React, { Component } from 'react';
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";
import ShareList from "./ShareList"
import { SketchPicker } from 'react-color';

class TodoList extends Component {

    constructor(props){
        super(props);
        this.state = {showColorPalette: false, backgroundColor: "#00d8ff", toggleShare: false}

        this.toggleColorPallete = this.toggleColorPallete.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleToggleShare = this.handleToggleShare.bind(this);
        this.handleChangeComplete = this.handleChangeComplete.bind(this);

    }

    toggleColorPallete(e){
        e.preventDefault();
        this.setState({showColorPalette: !this.state.showColorPalette})
    }

    handleDeleteClick(e){
        e.preventDefault();
        this.props.onTodoListDelete(this.props.id);
    }

    handleToggleShare(e){
        e.preventDefault();
        this.setState({toggleShare: !this.state.toggleShare});
    }

    handleChangeComplete = (color) => {
      this.props.onColorChange(this.props.id, color.hex);
      this.setState({ backgroundColor: color.hex });
    };

    render() {
        var todoItemNodes = this.props.todos.map((todo) => {
            return (
                <li>
                  <TodoItem
                      listID={this.props.id}
                      itemID={todo.id}
                      text={todo.text}
                      onItemEdit={this.props.onTodoItemEdit}
                      onItemDelete={this.props.onTodoItemDelete}
                      listIsSelected={this.props.isSelected}
                      isCompleted={todo.isCompleted}
                      toggleCompleted={this.props.onCompleted}
                  />
                </li>
            )
        });

        var colorButtonStyles = {
           border: 'none',
           color: 'black'
        }

        var todoListStyles = {
          backgroundColor: this.props.color
        }
        return (
          <div className="todo-list-container">
            <div style={todoListStyles} className="todo-list row">
              <div className="col-sm-6">
                <span>
                  {this.props.name}
                  <i className="fa fa-wrench todo-button" onClick={this.props.onConfig} id={this.props.id} aria-hidden="true" title="List Configurations"></i>
                  <i className="fa fa-trash todo-button" onClick={this.handleDeleteClick} id={this.props.id} aria-hidden="true" title="Delete List"></i>
                </span>
                <ul>
                    {todoItemNodes}
                </ul>
                  {this.props.isSelected ?
                      <AddTodo
                        listID={this.props.id}
                        onSubmit={this.props.onTodoSubmit}
                      /> : null}
              </div>
              <div className="col-sm-3">
                <i style={colorButtonStyles} className="fa fa-paint-brush todo-button" onClick={this.toggleColorPallete} title="Choose background color" aria-hidden="true"></i>
                {this.state.showColorPalette ?
                    <SketchPicker color={ this.props.color } onChangeComplete={ this.handleChangeComplete }/> : null}
              </div>
              <div className="col-sm-3">
                <i className="fa fa-share-alt todo-button" onClick={this.handleToggleShare} title="Share list with user" aria-hidden="true"></i>
                {this.state.toggleShare ?
                    <ShareList users={this.props.users}
                               onShare={this.props.onShareList}
                               listID={this.props.id}/> : null}
              </div>
          </div>
        </div>
        )
    }
}

export default TodoList;
