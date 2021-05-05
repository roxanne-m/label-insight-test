import React, { Component } from 'react';
import './App.css';
import ImageApiService from './Services/image-service';
import ImgContext from './contexts/ImgContext';

class App extends Component {
  static contextType = ImgContext;

  componentDidMount() {
    this.context.clearError();

    ImageApiService.getImages().then((res) => {
      this.context.setLabelImage(res);
      console.log(this.context.labelImage, 'THIS CONTEXT');
      console.log(res);
    });
  }
  // handleFetchButton = (e) => {
  //   e.preventDefault();
  //   ImageApiService.getImages().then((res) => {
  //     this.context.setLabelImage(res);
  //   });
  // };
  render() {
    // console.log(this.context, 'THIS CONTEXT');
    const imagesDisplayed = this.context.labelImage.map((label) => {
      return (
        <div>
          <h3>{label[0].title}</h3>
        </div>
      );
    });
    return (
      <div>
        <h1>Label Insight Images</h1>

        <section>
          <button>Fetch Images</button>
          <p>Display 1</p>
          <div>{imagesDisplayed}</div>
        </section>
      </div>
    );
  }
}

export default App;
