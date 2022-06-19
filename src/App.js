import "./App.css";
import Navbar from "./components/Navbar";
import React, { Component } from "react";
import News from "./components/News";
import { BrowserRouter, Route, Routes } from "react-router-dom";
export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API;

  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  key="general"
                  apiKey={this.apiKey}
                  pageSize={8}
                  category={"general"}
                  country={"in"}
                />
              }
            />
            <Route
              exact
              path="/business"
              element={
                <News
                  key="business"
                  apiKey={this.apiKey}
                  pageSize={8}
                  category={"business"}
                  country={"in"}
                />
              }
            />
            <Route
              exact
              path="/entertainment"
              element={
                <News
                  key="entertainment"
                  apiKey={this.apiKey}
                  pageSize={8}
                  category={"entertainment"}
                  country={"in"}
                />
              }
            />
            <Route
              exact
              path="/health"
              element={
                <News
                  key="health"
                  apiKey={this.apiKey}
                  pageSize={8}
                  category={"health"}
                  country={"in"}
                />
              }
            />
            <Route
              exact
              path="/science"
              element={
                <News
                  key="science"
                  apiKey={this.apiKey}
                  pageSize={8}
                  category={"science"}
                  country={"in"}
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <News
                  key="sports"
                  apiKey={this.apiKey}
                  pageSize={8}
                  category={"sports"}
                  country={"in"}
                />
              }
            />
            <Route
              exact
              path="/tech"
              element={
                <News
                  key="tech"
                  apiKey={this.apiKey}
                  pageSize={8}
                  category={"technology"}
                  country={"in"}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
