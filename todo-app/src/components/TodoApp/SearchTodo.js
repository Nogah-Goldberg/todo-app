/**
 * Created by Yoav Rosenbaum 304953128 and Nogah Goldberg 302365713.
 */
import React, { Component } from 'react';


class SearchTodo extends Component {

    constructor(props){
        super(props);

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(){
        var searchText = this.refs.searchText.value;

        this.props.onSearch(searchText);
    }

    render() {

        return (
            <div className="search-div">
                <input type="search" ref="searchText" className="search-todo-item" placeholder="Search todo items" onChange={this.handleSearch} title="search todo items in lists will display all lists containing query and all empty lists"/>
            </div>
        )
    }
}

export default SearchTodo;
