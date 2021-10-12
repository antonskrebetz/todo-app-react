import React, { Component } from "react";
import AppHeader from "../app-header/app-header";
import PostAddForm from "../post-add-form/post-add-form";
import PostList from "../post-list/post-list";
import PostStatusFilter from "../post-status-filter/post-status-filter";
import SearchPanel from "../search-panel/search-panel";
import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {label: 'Going to home', important: true, like: true, id: 1},
        {label: 'Going out', important: true, like: false, id: 2},
        {label: 'Going to bad...', important: false, like: false, id: 3},
        {label: 'Going to the cinema', important: false, like: false, id: 4}
      ],
      term: '',
      filter: 'all'
    }
    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onToggleImportant = this.onToggleImportant.bind(this);
    this.onToggleLiked = this.onToggleLiked.bind(this);
    this.onUpdateSearch = this.onUpdateSearch.bind(this);
    this.onFilterSelect = this.onFilterSelect.bind(this);
    this.maxId = 5;
  }

  deleteItem(id) {
    this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === id);
      const before = data.slice(0, index);
      const after = data.slice(index + 1);
      const newArr = [...before, ...after];

      return {
        data: newArr
      }
    })
  }

  addItem(text) {
    const newItem = {
      label: text,
      important: false,
      id: this.maxId++
    }
    this.setState(({data}) => {
      const newArray = [...data, newItem];
      return {
        data: newArray
      }
    })
  }

  onToggleImportant(id) {
    this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === id);
      const old = data[index];
      const newItem = {...old, important: !old.important};
      const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
      return {
        data: newArr
      }
    })
  }

  onToggleLiked(id) {
    this.setState(({data}) => {
        const index = data.findIndex(elem => elem.id === id);

        const old = data[index];
        const newItem = {...old, like: !old.like};

        const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
        return {
            data: newArr
        }
    }); 
  }

  searchPost(items, term) {
    if (term.length === 0) {
      return items
    }

    return items.filter(item => {
      return item.label.indexOf(term) > -1;
    })
  }

  filterPost(items, filter) {
    if (filter === 'like') {
      return items.filter(item => item.like)
    } else {
      return items;
    }
  }

  onUpdateSearch(term) {
    this.setState({term});
  }

  onFilterSelect(filter) {
    this.setState({filter});
  }

  render() {
    const {data, term, filter} = this.state;

    const liked = data.filter((item) => item.like).length;
    const allPosts = data.length;
    const visiblePosts = this.filterPost(this.searchPost(data, term), filter);
    return (
      <div className="app">
        <AppHeader liked={liked} allPosts={allPosts}/>
        <div className="search-panel d-flex">
          <SearchPanel
            onUpdateSearch={this.onUpdateSearch}/>
          <PostStatusFilter
            filter={filter}
            onFilterSelect={this.onFilterSelect}/>
        </div>
        <PostList 
          posts={visiblePosts}
          onDelete={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleLiked={this.onToggleLiked}/>
        <PostAddForm
          onAdd={this.addItem}/>
      </div>
    )
  }
}