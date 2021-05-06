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
      isOpen: false, // Set Modal status to false
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

  // Button that handles the event of displaying a new set of 25 colors
  handleNewColorsButton = (e) => {
    e.preventDefault();
    this.setState({
      limit: this.state.limit + 25, // update state to add 25 to its limit
    });
  };

  // Changes the state isOpen to either true or false in order to handle when clicked
  handleModal = (e) => {
    e.preventDefault();
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    // destruct array
    const { labelInsightImages } = this.state;

    // array prototype to display 25 colors
    let colorfulSquares = this.state.labelInsightImages
      .slice(this.state.limit, this.state.limit + 25)
      .map((images) => (
        // <div className='grid' key={images.id}>
        <div>
          <img
            className='grid-item'
            key={images.id}
            src={images.thumbnailUrl}
            onClick={this.handleModal}
            alt='Brightly colored squares'
          />

          {/* <Modal
            isOpen={this.state.isOpen}
            handleModal={this.handleModal}
            title={images.title}
            id={images.id}
            url={images.url}
          /> */}
          <div
            className='modal-wrapper'
            style={{ display: this.state.isOpen ? 'block' : 'none' }}
          >
            <div className='modal-header'>
              <p>Square Color Information</p>
              <span onClick={this.handleModal} className='close-modal-button'>
                x
              </span>
            </div>
            <div className='modal-content'>
              <div className='modal-body'>
                <h4>{images.title}</h4>
                <img
                  key={images.id}
                  src={images.url}
                  alt='Brightly colored square'
                />
              </div>
              <div className='modal-footer'>
                <button onClick={this.handleModal} className='button-cancel'>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        // {/* </div> */}
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
          <section>{colorfulSquares}</section>
        </main>
      </div>
    );
  }
}

export default App;
