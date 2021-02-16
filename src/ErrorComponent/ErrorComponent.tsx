import React, { ReactNode } from 'react';

type State = {
  hasError: boolean;
};

type Props = {
  children: ReactNode;
};

class ErrorComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: unknown): void {
    console.log(error);
  }

  render(): ReactNode {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.hasError) {
      return <div> Error in Loading..</div>;
    }

    return this.props.children;
  }
}

export default ErrorComponent;
