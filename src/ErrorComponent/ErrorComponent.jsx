import React from 'react';

class ErrorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error) {
    console.log(error);
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.hasError) {
      return <div> Error in Loading..</div>;
    }

    return this.props.children;
  }
}

export default ErrorComponent;
