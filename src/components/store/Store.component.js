import React, { Component } from "react";
import "./Store.css";
import LoadingGif from "./assets/loading.gif";
import axios from "axios";
import { Item } from "../Item/Item.component";
import { Ad } from "../ad/Ad.component";
let CurrentItems = [];
let NextItems = [];
let ads = [];

export class Store extends Component {
  constructor(props) {
    super(props);
    this.random = this.random.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      CurrentItemsList: [],
      NextItems: [],
      endOfResults: false
    };
  }

  random() {
    let number = Math.floor(Math.random() * 1000);
    while (ads.indexOf(number) !== -1) {
      number = Math.floor(Math.random() * 1000);
    }
    ads.push(number);
    return number;
  }
  fetchData(sortMode, nextPage, current, newSearch) {
    if (newSearch) {
      this.props.reset();
      document.body.style.cursor = "progress";
    }
    if (!current && NextItems[1]) {
      CurrentItems.push(...NextItems);
      NextItems = [];
      this.props.toggleLoading(true);
    }
    if (!this.state.endOfResults) {
      axios
        .get("/api/products?_page=" + nextPage + "&_limit=20&_sort=" + sortMode)
        .then(response => {
          if (response.data[1]) {
            response.data.forEach(element => {
              if (element && current) {
                CurrentItems.push(element);
              } else if (element) {
                NextItems.push(element);
              }
            });
          } else {
            CurrentItems.push("end");
            this.setState({ endOfResults: true });
          }
          if (current) {
            this.setState({ CurrentItemsList: CurrentItems });
          } else if (response.data[1]) {
            NextItems.unshift({
              class: "ad",
              src: "/ads/?r=" + this.random()
            });
            this.setState({ NextItems: NextItems });
          }
          this.props.toggleLoading(false);
          document.body.style.cursor = "initial";
        })
        .catch(err => console.log(err));
    }
  }

  componentDidUpdate(prevProps) {
    let props = this.props;
    let state = this.state;
    if (props.newSearch) {
      this.setState(
        { endOfResults: false },
        this.fetchData(props.sort, props.nextPage, true, this.props.newSearch)
      );
      CurrentItems = [];
      NextItems = [];
    }
    if (props.nextPage !== prevProps.nextPage && props.loading === false) {
      this.props.toggleLoading(true);
      this.fetchData(
        props.sort,
        props.nextPage + 1,
        false,
        this.props.newSearch
      );
    }
  }

  componentDidMount() {
    let props = this.props;
    let state = this.state;
    this.fetchData(props.sort, props.nextPage, true, this.props.newSearch);
    this.fetchData(props.sort, props.nextPage + 1, false, this.props.newSearch);
  }

  render() {
    const Items = this.state.CurrentItemsList;
    let Elements;
    let props = this.props;
    if (Items[0]) {
      Elements = Items.map(item => {
        if (item === "end") {
          return <h1 key="end">~ end of catalogue ~</h1>;
        } else if (item.class === "ad") {
          return <Ad src={item.src} class={item.class} key={item.src} />;
        } else {
          return (
            <Item
              id={item.id}
              price={item.price}
              size={item.size}
              date={item.date}
              face={item.face}
              key={item.id}
            />
          );
        }
      });
    }
    return (
      <div id="pageContainer">
        <div id="itemsContainer">
          {Elements}
          {this.props.loading && !this.state.endOfResults && (
            <div id={"Loading_container"}>
              <img id="loading" src={LoadingGif} alt={"Loading..."} />
            </div>
          )}
        </div>
      </div>
    );
  }
}
