import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';
class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func,
  };

  render() {
    const { onClick } = this.props;
    return (
      <button className={css.button} onClick={onClick}>
        Load more
      </button>
    );
  }
}

export default Button;
