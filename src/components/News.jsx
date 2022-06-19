import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
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
      loading: true,
      page: 1,
      totalResults: 0,
      last: false,
    };
    document.title = `${
      "NewsMonkey " +
      this.props.category.charAt(0).toUpperCase() +
      this.props.category.slice(1)
    }`;
  }

  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6e7ecdd1a225484d8e431070ba7d4b4f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      articles: this.state.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    await this.updateNews();
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

  fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=6e7ecdd1a225484d8e431070ba7d4b4f&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ page: this.state.page + 1 });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    console.log("render");
    return (
      <>
        <h2 className="text-center my-3">
          {" "}
          NewsMonkey - Top{" "}
          {this.props.category.charAt(0).toUpperCase() +
            this.props.category.slice(1)}{" "}
          Headlines
        </h2>
        {this.state.loading && <Spinner />}
        {/* {console.log(this.state.articles.length)} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
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
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between my-5">
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
        </div> */}
      </>
    );
  }
}

export default News;
