import React, { Component } from 'react';

const ImgContext = React.createContext({
  error: null,
  labelImage: [],

  setError: () => {},
  clearError: () => {},
  setLabelImage: () => {},
});

export default ImgContext;

export class ImgProvider extends Component {
  state = {
    error: null,
    labelImage: {},
  };

  setError = (error) => {
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  setLabelImage = (images) => {
    this.setState({ images });
  };

  render() {
    const value = {
      error: this.state.error,
      labelImage: this.state.labelImage,

      setError: this.setError,
      clearError: this.clearError,
      setLabelImage: this.setLabelImage,
    };

    return (
      <ImgContext.Provider value={value}>
        {this.props.children}
      </ImgContext.Provider>
    );
  }
}
