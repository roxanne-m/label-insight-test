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
    });
  }

  render() {
    const imagesDisplayed = this.context.labelImage.map((label) => {
      return (
        <li key={label.id}>
          <h3>{label.title}</h3>
        </li>
      );
    });
    return (
      <div>
        <h1>Label Insight Images</h1>

        <section>{imagesDisplayed}</section>
      </div>
    );
  }
}

export default App;
