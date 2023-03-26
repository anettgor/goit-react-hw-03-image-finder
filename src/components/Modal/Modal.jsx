import { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

class Modal extends Component {
  static propTypes = {
    image: PropTypes.string,
    onClick: PropTypes.func,
    alt: PropTypes.string,
    onKeyDown: PropTypes.func,
  };

  componentDidMount() {
    // console.log('Modal componentDidMount');
    window.addEventListener('keydown', this.escFunction);
  }

  componentWillUnmount() {
    // console.log('Modal componentWillUnmount');
    window.removeEventListener('keydown', this.escFunction);
  }

  escFunction = e => {
    console.log('escape clicked', e);
    if (e.code === 'Escape') {
      return this.props.onClose();
    }
  };
  render() {
    const { image, onClose, alt } = this.props;
    return (
      <div className={css.overlay} onClick={onClose}>
        <div className={css.modal}>
          <img src={image} alt={alt} />
        </div>
      </div>
    );
  }
}
export default Modal;
