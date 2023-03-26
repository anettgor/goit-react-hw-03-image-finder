import { Component } from 'react';
import css from './Modal.module.css';

class Modal extends Component {
  render() {
    const { image, onClick } = this.props;
    return (
      <div className={css.overlay} onClick={onClick}>
        <div className={css.modal}>
          <img src={image} alt="" />
        </div>
      </div>
    );
  }
}
export default Modal;
