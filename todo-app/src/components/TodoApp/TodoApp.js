/**
 * Created by Yoav Rosenbaum 304953128 and Nogah Goldberg 302365713.
 */
import React, { Component } from 'react';
import axios from 'axios'
import uuidv4 from 'uuid/v4'
import TodoList from './TodoList'
import SearchTodo from './SearchTodo'
import AddTodoList from './AddTodoList'
import { Redirect } from 'react-router';

class TodoApp extends Component {

    constructor(props){
        super(props);
        this.state = {
            searchText: '',
            loggedInUser: null,
            allUsers: null,
            todoLists: [],
            selectedList: null,
            redirect: false,
            url: "https://vast-everglades-99925.herokuapp.com/api"
        };

        this.handleConfigList = this.handleConfigList.bind(this);
        this.handleItemEdit = this.handleItemEdit.bind(this);
        this.handleItemDelete = this.handleItemDelete.bind(this);
        this.handleListDelete = this.handleListDelete.bind(this);
        this.handleNewList = this.handleNewList.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShareList = this.handleShareList.bind(this);
        this.getTodoLists = this.getTodoLists.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleCompletedItem = this.handleCompletedItem.bind(this);
        this.searchOrAll = this.searchOrAll.bind(this);

    }


    getTodoLists(){
        axios.get(this.state.url + "/todolists")
            .then(res => {
                this.setState({ todoLists: res.data });
            })
        console.log("getTodoLists()");
    }

    handleColorChange(listID, newColor) {
     console.log("changing color " + newColor + " in list " + listID);
     axios.put(this.state.url + "/todolists/" + listID, { color: newColor })
         .then(res => {
             this.searchOrAll();
         })
   }

    handleConfigList(e){
        e.preventDefault();
        if (e.target.id === this.state.selectedList){
            this.setState({
                selectedList: null,

            });
        }
        else {
            this.setState({
                selectedList: e.target.id,

            });
        }

    }

    handleItemEdit(listID, itemID, newText){
        var todoLists = this.state.todoLists;
        var todoListIndex = 0;
        for (var i in todoLists){
            for (var j in todoLists[i].data){
                if (todoLists[i]['_id'] === listID && todoLists[i].data[j].id === itemID){
                    todoLists[i].data[j].text = newText;
                    todoListIndex = i;
                }
            }

        }
        axios.put(this.state.url + "/todolists/" + listID, { data: todoLists[todoListIndex].data })
            .then(res => {
                this.searchOrAll();
            });
        console.log("updating item " + itemID + " from list " + listID + " with text " + newText)
    }

    handleCompletedItem(listID, itemID){
        var todoLists = this.state.todoLists;
        var todoListIndex = 0;
        for (var i in todoLists){
            for (var j in todoLists[i].data){
                if (todoLists[i]['_id'] === listID && todoLists[i].data[j].id === itemID){
                    todoLists[i].data[j].isCompleted = !todoLists[i].data[j].isCompleted;
                    todoListIndex = i;
                }
            }

        }
        axios.put(this.state.url + "/todolists/" + listID, { data: todoLists[todoListIndex].data })
            .then(res => {
                this.searchOrAll();
            });
        console.log("updating item " + itemID + " from list " + listID)
    }

    handleItemDelete(itemID, listID){
        var todoLists = this.state.todoLists;
        var todoListIndex = 0;
        for (var i in todoLists){
            if (todoLists[i]['_id'] === listID){
              todoLists[i].data = todoLists[i].data.filter((item) => {
                  return item.id !== itemID;
              });
              todoListIndex = i;
            }
        }
        axios.put(this.state.url + "/todolists/" + listID, { data: todoLists[todoListIndex].data })
            .then(res => {
                this.searchOrAll();
            });

        console.log("Deleting item " + itemID + " in list " + listID);
    }

    handleListDelete(listID){
        axios.delete(this.state.url + "/todolists/" + listID)
            .then(res => {
                this.searchOrAll();
            });
        console.log("Deleting list " + listID);
    }

    handleSubmit(listID, text){
        // post call to server with new todoItem to add to list

        var todoLists = this.state.todoLists;
        var todoListIndex = 0;

        for (var i in todoLists){
            if (todoLists[i]['_id'] === listID){
                todoLists[i].data = [...todoLists[i].data, { id: uuidv4(), text: text, isCompleted: false}]
                todoListIndex = i;
            }
        }
        axios.put(this.state.url + "/todolists/" + listID, { data: todoLists[todoListIndex].data })
            .then(res => {
                this.searchOrAll();
            });
        console.log("inserting to list " + listID + " the text " + text);
    }

    handleNewList(title){

        var loggedInUser = this.state.loggedInUser;
        // Server post new list with title
        axios.post(this.state.url + '/todolists', {
            title: title,
            username: loggedInUser
        })
            .then(res => {
            this.searchOrAll();
        });
        console.log("added list " + title);
    }

    getUserList(){
        // get users from server
        // Server post new list with title
        axios.get(this.state.url + '/users').then(res => {
          this.setState({ allUsers: res.data });
        });
    }

    handleShareList(username, listID){
        console.log("Sharing list " + listID + " with user " + username);
        axios.put(this.state.url + "/share/" + listID, {username : username})
            .then(res => {
              if (res.data.message === 'shared successfully'){
                alert("shared successfully")
              } else{
                alert("please try again");
              }
        });
    }

    handleSearch(searchText){
        var todolists = this.state.todoLists;

        var filteredTodolists = todolists.map((todolist) => {
            var filteredData = todolist.data.filter((comment) => {
                return comment.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
            })

            todolist.data = filteredData;

            return todolist;
        })

        this.setState({todoLists: filteredTodolists, searchText: searchText});
        console.log("handleSearch()");

    }

    searchOrAll(searchText){
        if (typeof searchText === "string" && searchText.length !== 0)
            this.handleSearch(searchText);
        else
            this.getTodoLists();
    }

    componentDidMount() {
        this.getTodoLists();
        this.getUserList();

        // getting username from pathname
        var loggedInUser = this.props.location.pathname.split('/')[2]
        this.setState({ loggedInUser: loggedInUser});
    }

    handleLogout() {
      this.setState({
        redirect: true,
        username: null
      });
    }

    render() {
      if (this.state.redirect) {
        var url = "/";
         return <Redirect push to={url} />;
      }
      let todoListNodes = this.state.todoLists.map((todoList) => {
        if (this.state.loggedInUser === todoList.username || todoList.sharedWith.includes(this.state.loggedInUser)){
          return (
                <TodoList
                    id={todoList["_id"]}
                    name={todoList.title}
                    todos={todoList.data}
                    color={todoList.backgroundColor}
                    onConfig={this.handleConfigList}
                    onTodoItemEdit={this.handleItemEdit}
                    onTodoItemDelete={this.handleItemDelete}
                    onTodoListDelete={this.handleListDelete}
                    onTodoSubmit={this.handleSubmit}
                    onColorChange={this.handleColorChange}
                    onCompleted={this.handleCompletedItem}
                    isSelected={this.state.selectedList === todoList["_id"]}
                    onShareList={this.handleShareList}
                    users={this.state.allUsers}
                    username={todoList.username}
                >
                </TodoList>
              )
        }
        else {
          return null;
        }

      });
        return (
            <div className="TodoApp container">
            <button className="logout-button" onClick = {this.handleLogout}> Logout </button>
              <SearchTodo onSearch={this.searchOrAll}/>
                {todoListNodes}
                <AddTodoList onSubmit={this.handleNewList}/>
            </div>
        );
    }
}

export default TodoApp;
