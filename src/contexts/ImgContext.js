import React, { Component } from 'react';

const ImgContext = React.createContext({
  error: null,

  setError: () => {},
  clearError: () => {},
});

export default ImgContext;

export class ImgProvider extends Component {
  state = {
    error: null,
  };

  setError = (error) => {
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  render() {
    const value = {
      error: this.state.error,

      setError: this.setError,
      clearError: this.clearError,
    };

    return (
      <ImgContext.Provider value={value}>
        {this.props.children}
      </ImgContext.Provider>
    );
  }
}
