import React from "react";
import "./App.css";
import { Store } from "./components/store/Store.component";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {
      sort: "id",
      nextPage: 1,
      loading: false,
      nextResults: true,
      newSearch: false
    };
  }

  handleSort(param) {
    this.setState({
      sort: param,
      nextPage: 1,
      newSearch: true,
      loading: true,
      nextResults: true
    });
  }

  handleReset() {
    this.setState({ newSearch: false });
  }

  handleScroll() {
    if (!this.state.loading) {
      let height = document.body.offsetHeight;
      let scrollY = window.pageYOffset;
      if (scrollY + window.innerHeight + 200 > height) {
        this.setState({
          nextPage: this.state.nextPage + 1,
          nextResults: true
        });
      }
    }
  }
  toggleLoading(value) {
    this.setState({ loading: value });
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    return (
      <div id="App">
        <div id="buttonsContainer">
          <button
            onClick={() => this.handleSort("id")}
            className={"sortButton"}
          >
            ID
          </button>
          <button
            onClick={() => this.handleSort("price")}
            className={"sortButton"}
          >
            Price
          </button>
          <button
            onClick={() => this.handleSort("size")}
            className={"sortButton"}
          >
            Size
          </button>
        </div>
        <div id="content-container">
          <Store
            sort={this.state.sort}
            nextPage={this.state.nextPage}
            nextResults={this.state.nextResults}
            toggleLoading={this.toggleLoading}
            loading={this.state.loading}
            newSearch={this.state.newSearch}
            reset={this.handleReset}
          />
        </div>
      </div>
    );
  }
}

export default App;
