import React, { Component } from 'react';
import './App.css';
import ImgContext from './contexts/ImgContext';
import { Modal } from './component/Modal/Modal';
import { Intro } from './component/Introduction/Intro';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labelInsightImages: [], // Set initial state of images to empty array
      limit: 0, // Set initial limit to zero to begin at index 0 of array
      isOpen: false, // Set Modal clicked status to false and can update if closed or open
      userDescriptions: [], // Empty array that stores user's descriptions
      userDescription: '',
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
  handleModal = (id) => {
    this.setState({
      isOpen: {
        [id]: true,
      },
    });
  };

  handleDescriptionChange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  // Event Listener that updates the userDescription state
  handleDescription = (e) => {
    e.preventDefault();
    this.setState({
      userDescriptions: [
        ...this.state.userDescriptions,
        this.state.userDescription,
      ],
      userDescription: '',
    });
    alert('A description was submitted');
  };

  render() {
    // destructure array
    const { labelInsightImages } = this.state;

    // Array prototype to display 25 colors and map through array
    // Call Modal component and pass in props
    let colorfulSquares = labelInsightImages
      .slice(this.state.limit, this.state.limit + 25)
      .map((images) => (
        <div>
          <Modal
            isOpen={this.state.isOpen[images.id]}
            userDescription={this.state.userDescription}
            handleModal={this.handleModal}
            handleDescriptionChange={this.handleDescriptionChange}
            handleDescription={this.handleDescription}
            title={images.title}
            id={images.id}
            url={images.url}
          />
          <img
            onClick={this.handleModal.bind(this, images.id)}
            className='grid-item'
            key={images.id}
            src={images.thumbnailUrl}
            alt='Brightly colored squares'
          />
        </div>
      ));

    return (
      <div>
        <header>
          <h1>Paint Visions</h1>
        </header>
        <main>
          <Intro />
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
