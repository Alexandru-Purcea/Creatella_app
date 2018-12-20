import React from "react";
import "./Item.css";

export class Item extends React.Component {
  constructor(props) {
    super(props);
    this.getRelativeDate = this.getRelativeDate.bind(this);
  }
  getRelativeDate(uploadDate) {
    let currentDate = new Date().toDateString();
    let uploadMonth = uploadDate.slice(4, 7);
    let currentMonth = currentDate.slice(4, 7);
    let daysPassed = currentDate.slice(8, 11) - uploadDate.slice(8, 11);
    if (uploadMonth === currentMonth && daysPassed < 4) {
      if (daysPassed === 0) {
        return "today";
      } else if (daysPassed === 1) {
        return "1 day ago";
      } else {
        return daysPassed + " days ago";
      }
    } else {
      return uploadDate.slice(4, 16);
    }
  }
  render() {
    let props = this.props;
    return (
      <div id={"item"}>
        <div className="itemPreview">{props.face}</div>
        <div className="itemDetailsContainer">
          <p className="itemDetails"> Price: ${props.price} </p>
          <p className="itemDetails"> Size: {props.size} </p>
          <p className="itemDetails">
            Posted: {this.getRelativeDate(props.date)}
          </p>
        </div>
      </div>
    );
  }
}
