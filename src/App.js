import React, { Component } from 'react';
import './App.css';
// import ImageApiService from './Services/image-service';
import ImgContext from './contexts/ImgContext';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labelInsightImages: [], // Set initial state of images to empty array
      limit: 0, // Set initial limit to zero to begin at index 0 of array
      isOpen: false, // Set Modal clicked status to false and can update if closed or open
      isActive: '', // Set Modal to empty string
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

  toggleModal = (id) => {
    let idString = '';

    if (id > 0) {
      idString = 'modal' + String(id);
      this.setState({ isActive: idString });
    }
    console.log('Toggle Modal past if statement!');

    return (
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
            {/* Displays title and image of square */}
            <h4>{this.state.labelInsightImages.title}</h4>
            <img
              key={this.state.labelInsightImages.id}
              src={this.state.labelInsightImages.url}
              alt='Brightly colored square'
            />

            {/* Form for user's descriptions */}
            <section>
              <h4>Add a description!</h4>
              <form onClick={this.handleDescription}>
                <label>Paint Description: </label>
                <input type='text' id='description' name='description'></input>
                <button type='button'>Post</button>
              </form>
            </section>
          </div>
          <div className='modal-footer'>
            <button onClick={this.handleModal} className='button-cancel'>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

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
          <img
            className='grid-item'
            key={images.id}
            src={images.thumbnailUrl}
            onClick={this.toggleModal.bind(images.id)}
            alt='Brightly colored squares'
          />

          {/* The Modal */}
          {/* <div
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
          </div> */}
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
