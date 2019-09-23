import React from 'react';

class ComponentWithError extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'Message from ComponentWithError.',
    };
  }

  render() {
    const { message } = this.state;
    throw new Error('An error has occured in ComponentWithError component!');
    return <p>{message}</p>; // eslint-disable-line no-unreachable
  }
}

export default ComponentWithError;
