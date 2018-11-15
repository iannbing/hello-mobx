import { Component } from 'react';

class Fetcher extends Component {
  state = { data: null, loading: false };
  componentDidMount() {
    this.doFetch();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id) this.doFetch();
  }
  doFetch = async () => {
    const { id } = this.props;
    this.setState({ loading: true });
    const data = await this.props.fetch(id);
    this.setState({ data, loading: false });
  };
  render() {
    const { children } = this.props;
    const { data, loading } = this.state;
    return children ? !loading && children({ data, loading }) : null;
  }
}

export default Fetcher;
