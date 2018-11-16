import { Component } from 'react';

export const fetch = async key => {
  const retrievedObject = localStorage.getItem(key);
  return retrievedObject ? JSON.parse(retrievedObject) : {};
};

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
    const fetchFn = this.props.fetch || fetch;
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
