import { Component } from 'react';

const defaultFetch = async key => {
  const retrievedObject = localStorage.getItem(key);
  return retrievedObject ? JSON.parse(retrievedObject) : [];
};

class Fetcher extends Component {
  state = { data: null, loading: false };

  componentDidMount() {
    this.doFetch();
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props;
    if (prevProps.id !== id) this.doFetch();
  }

  doFetch = async () => {
    const { id, fetch } = this.props;
    this.setState({ loading: true });
    const fetchFn = fetch || defaultFetch;
    const data = await fetchFn(id);
    this.setState({ data, loading: false });
  };

  render() {
    const { children } = this.props;
    const { data, loading } = this.state;
    return children ? !loading && children({ data, loading }) : null;
  }
}

export default Fetcher;
