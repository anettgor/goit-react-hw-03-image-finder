import { Component } from 'react';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({
      query: e.target.value,
    });
  };

  onHandleSubmit = e => {
    e.preventDefault();
    const value = this.state.query;
    if (value.trim() !== '') {
      this.props.onSubmit(this.state.query);
    } else {
      alert('Please provide a query');
      return;
    }
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.onHandleSubmit}>
          <button className={css['searchForm-button']} type="submit">
            <span className={css['searchForm-button-label']}>Search</span>
          </button>
          <input
            onChange={this.handleChange}
            className={css['searchForm-input']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;
