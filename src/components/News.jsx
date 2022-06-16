import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };

  constructor(props) {
    super(props);
    console.log("Nice");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      last: false,
    };
    document.title =
      "NewsMonkey " +
      this.props.category.charAt(0).toUpperCase() +
      this.props.category.slice(1);
  }

  async updateNews() {
    console.log(this.state.page, "Update");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d297cdd389974869a30ea0a8843524f0&page=${this.state.page}&pageSize=${this.props.pageSize}`;
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

  async componentDidMount() {
    await this.updateNews();
    console.log(this.state.page, "Mount");
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
      await this.setState({
        page: this.state.page + 1,
      });
      await this.updateNews();
    }
    console.log(this.state.page, "Next");
  };

  handlePrevClick = async () => {
    await this.setState({
      page: this.state.page - 1,
      last: false,
    });
    await this.updateNews();
    console.log(this.state.page, "Prev");
  };

  render() {
    console.log("render");
    return (
      <div className="container my-3">
        <h2 className="text-center my-3">
          {" "}
          NewsMonkey - Top{" "}
          {this.props.category.charAt(0).toUpperCase() +
            this.props.category.slice(1)}{" "}
          Headlines
        </h2>
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
                    date={element.publishedAt}
                    author={
                      element.author !== null ? element.author : "unknown"
                    }
                    source={element.source.name}
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
