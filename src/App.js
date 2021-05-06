import React, { Component } from 'react';
import './App.css';
// import ImageApiService from './Services/image-service';
import ImgContext from './contexts/ImgContext';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labelInsightImages: [],
      limit: 25,
    };
  }

  static contextType = ImgContext;

  componentDidMount() {
    this.context.clearError();
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          labelInsightImages: responseJson,
        });
      });
  }

  // Button that handles the event of displaying a new set of 25 colors
  handleNewColorsButton = (e) => {
    e.preventDefault();
    this.setState({
      limit: this.state.limit + 25,
    });
  };

  render() {
    // destruct array
    const { labelInsightImages } = this.state;

    // conditional statement to only display 25 colors
    let colorfulSquares = this.state.labelInsightImages
      .slice(this.state.limit, this.state.limit + 25)
      .map((images) => (
        // <div className='grid' key={images.id}>
        <img
          className='grid-item'
          key={images.id}
          src={images.thumbnailUrl}
          alt='Brightly colored squares'
        />
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
