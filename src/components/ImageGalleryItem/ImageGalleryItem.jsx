import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  static propTypes = {
    hits: PropTypes.array,
    onClick: PropTypes.func,
  };
  render() {
    const { hits, onClick } = this.props;

    return hits.map(hit => (
      <li
        className={css.imageGalleryItem}
        key={hit.id}
        onClick={() => onClick(hit.largeImageURL, hit.tags)}
      >
        <img
          alt={hit.tags}
          src={hit.webformatURL}
          className={css['imageGalleryItem-image']}
        ></img>
      </li>
    ));
  }
}

export default ImageGalleryItem;
