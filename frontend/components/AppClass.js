import React from "react";
import axios from "axios";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at
const endpoint = "http://localhost:9000/api/result";

export default class AppClass extends React.Component {
  getX = (index) => Math.floor((index ? index : this.state.bIndex) % 3) + 1;
  getY = (index) => Math.floor((index ? index : this.state.bIndex) / 3) + 1;
  getCoordinates = (index) => `${this.getX(index)}, ${this.getY(index)}`;

  initialState = {
    bIndex: initialIndex,
    message: initialMessage,
    email: initialEmail,
    steps: initialSteps,
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  reset = () => {
    this.setState(this.initialState);
  };

  getNextIndex = (direction) => {
    const idx = this.state.bIndex;
    if (direction === "left") return [0, 3, 6].includes(idx) ? idx : idx - 1;
    if (direction === "up") return idx < 3 ? idx : idx - 3;
    if (direction === "right") return [2, 5, 8].includes(idx) ? idx : idx + 1;
    if (direction === "down") return idx > 5 ? idx : idx + 3;
  };

  move = (evt) => {
    const nextIndex = this.getNextIndex(evt.target.id);
    if (nextIndex === this.state.bIndex)
      this.setState({
        ...this.state,
        message: `You can't go ${evt.target.id}`,
      });
    else {
      this.setState({
        ...this.state,
        bIndex: nextIndex,
        steps: this.state.steps + 1,
        message: initialMessage,
      });
    }
  };

  onChange = (evt) => {
    this.setState({ ...this.state, email: evt.target.value });
  };

  onSubmit = (evt) => {
    evt.preventDefault();
    axios
      .post(endpoint, {
        x: this.getX(this.state.bIndex),
        y: this.getY(this.state.bIndex),
        steps: this.state.steps,
        email: this.state.email,
      })
      .then((res) => {
        this.setState({
          ...this.state,
          message: res.data.message,
          email: initialEmail,
        });
      })
      .catch((err) => {
        this.setState({ ...this.state, message: err.response.data.message });
      });
  };

  render() {
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <p>(This component is not required to pass the sprint)</p>
        <div className="info">
          <h3 id="coordinates">
            Coordinates ({this.getCoordinates(this.state.bIndex)})
          </h3>
          <h3 id="steps">
            You moved {this.state.steps} time{this.state.steps !== 1 && "s"}
          </h3>
        </div>
        <div id="grid">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
            <div
              key={idx}
              className={`square${idx === this.state.bIndex ? " active" : ""}`}
            >
              {idx === this.state.bIndex ? "B" : null}
            </div>
          ))}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          {["left", "up", "right", "down"].map((direction) => (
            <button key={direction} id={direction} onClick={this.move}>
              {direction.toUpperCase()}
            </button>
          ))}
          <button id="reset" onClick={this.reset}>
            reset
          </button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            id="email"
            type="email"
            placeholder="type email"
            value={this.state.email}
            onChange={this.onChange}
          ></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}