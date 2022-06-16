import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
export class News extends Component {
  constructor() {
    super();
    console.log("Nice");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      last: false,
    };
  }

  async componentDidMount() {
    console.log("render1");
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=d297cdd389974869a30ea0a8843524f0&page=1&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  handleNextClick = async () => {
    console.log("next");
    if (
      Math.ceil(this.state.totalResults / this.props.pageSize) <
      this.state.page + 1
    ) {
      this.setState({
        last: true,
      });
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=d297cdd389974869a30ea0a8843524f0&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({
        loading: true,
      });
      let data = await fetch(url);
      let parsedData = await data.json();
      // console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
      });
      console.log(url);
      console.log(this.state.page);
    }
  };

  handlePrevClick = async () => {
    console.log("Prev");
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=d297cdd389974869a30ea0a8843524f0&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      last: false,
      loading: false,
    });
    console.log(url);
    console.log(this.state.page);
    // console.log(page)
  };

  render() {
    console.log("render");
    return (
      <div className="container my-3">
        <h2 className="text-center my-3"> NewsMonkey - Top headlines </h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-3" key={element.url}>
                  <NewsItem
                    title={
                      element.title !== null
                        ? element.title.slice(0, 50)
                        : "no title"
                    }
                    description={
                      element.description !== null
                        ? element.description.slice(0, 100)
                        : "no description"
                    }
                    imageUrl={
                      element.urlToImage !== null
                        ? element.urlToImage
                        : "https://image.shutterstock.com/image-vector/no-image-available-sign-internet-260nw-261719003.jpg"
                    }
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between my-5">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handlePrevClick}
            disabled={this.state.page <= 1}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleNextClick}
            disabled={this.state.last}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
