import React, { Component } from 'react';
import './App.css';
// import ImageApiService from './Services/image-service';
import ImgContext from './contexts/ImgContext';
import { Modal } from './component/Modal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labelInsightImages: [], // Set initial state of images to empty array
      limit: 0, // Set initial limit to zero to begin at index 0 of array
      isOpen: false, // Set Modal clicked status to false and can update if closed or open
      userDescription: [], // Empty array that stores user's descriptions
    };
  }

  // ContextType to set use Error context.
  static contextType = ImgContext;

  componentDidMount() {
    this.context.clearError(); // Call context clearError

    // Fetch request to get photos
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((response) => response.json())
      .then((responseJson) => {
        // Update state of Images array to include response
        this.setState({
          labelInsightImages: responseJson,
        });
      });
  }

  // Event Listener for button that handles the event of displaying a new set of 25 colors
  handleNewColorsButton = (e) => {
    e.preventDefault();
    this.setState({
      limit: this.state.limit + 25, // update state to add 25 to its limit
    });
  };

  // Event Listener that changes the state isOpen to either true or false in order to handle when clicked
  handleModal = (e) => {
    e.preventDefault();
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  // Event Listener that updates the userDescription state
  handleDescription = (e) => {
    e.preventDefault();
    this.setState({
      userDescription: e.target.id,
    });
  };

  render() {
    // destruct array
    const { labelInsightImages } = this.state;

    // array prototype to display 25 colors and map through array
    let colorfulSquares = labelInsightImages
      .slice(this.state.limit, this.state.limit + 25)
      .map((images) => (
        <div onClick={this.handleModal}>
          <Modal
            isOpen={this.state.isOpen}
            handleModal={this.handleModal}
            handleDescription={this.handleDescription}
            title={images.title}
            id={images.id}
            url={images.url}
          />
          <img
            className='grid-item'
            key={images.id}
            src={images.thumbnailUrl}
            alt='Brightly colored squares'
          />{' '}
        </div>
      ));

    return (
      <div>
        <header>
          <h1>Paint Color Samples</h1>
        </header>
        <main>
          <div className='button-styling'>
            <button onClick={this.handleNewColorsButton}>New Colors</button>
          </div>
          <br />
          <br />
          <section className='grid'>{colorfulSquares}</section>
        </main>
      </div>
    );
  }
}

export default App;
