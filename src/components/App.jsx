import { Component } from 'react';
import axios from 'axios';
import { Notify } from 'notiflix';

import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGallery/ImageGalleryItem';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      alt: '',
      largeImg: '',
      error: false,
      isLoaded: false,
      query: '',
      items: [],
      API: '33187861-b0f031d63d8289b7509252611',
      PER_PAGE: 12,
      page: 1,
    };
  }

  componentDidMount() {
    this.delayedFetch();
    console.log('%c mount', 'color: purple');
  }

  componentDidUpdate() {
    console.log('%c update', 'color: blue');
  }

  delayedFetch() {
    setTimeout(() => {
      this.fetchImages();
    }, 500);
  }
  async fetchImages() {
    const { API, PER_PAGE, page, query } = this.state;

    try {
      const URL = `https://pixabay.com/api/?key=${API}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`;
      const res = await axios.get(URL);
      if (res && res.data.hits.length > 0) {
        this.setState({
          isLoaded: true,
          items: [...this.state.items, ...res.data.hits],
        });
      } else {
        Notify.info(
          'Sorry, there are no matches found. Try entering another query'
        );
      }
    } catch {
      this.setState({
        isLoaded: false,
        error: true,
      });
    }
  }

  handleSubmit = query => {
    if (query !== this.state.query) {
      this.setState({
        isLoaded: false,
        page: 1,
        items: [],
        query: query,
      });
      this.delayedFetch();
    } else {
      Notify.info('You are already looking at results of this query');
    }
  };

  showModal = (url, alt) => {
    this.setState({
      showModal: true,
      largeImg: url,
      alt: alt,
    });
  };

  hideModal = () => {
    this.setState({
      showModal: false,
    });
  };

  loadMore = e => {
    e.preventDefault();
    this.setState({
      isLoaded: false,
      page: this.state.page + 1,
    });
    this.delayedFetch();
  };

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplatColumns: '1fr',
          gridGap: 16,
          paddingBbottom: 24,
        }}
      >
        <Searchbar
          // handleChange={this.handleChange}
          // handleSubmit={this.handleSubmit}
          onSubmit={this.handleSubmit}
        />

        {!this.state.isLoaded && <Loader />}
        <ImageGallery>
          <ImageGalleryItem
            hits={this.state.items}
            onClick={this.showModal}
          ></ImageGalleryItem>
        </ImageGallery>

        {this.state.items.length > this.state.PER_PAGE - 1 && (
          <Button onClick={this.loadMore} />
        )}
        {this.state.showModal && (
          <Modal
            image={this.state.largeImg}
            alt={this.state.alt}
            onClick={this.hideModal}
          />
        )}
      </div>
    );
  }
}
