import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, date, author, source } =
      this.props;
    date = new Date(date);
    return (
      <div className="card my-2">
        <span
          className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
          style={{ left: "85%", zIndex: "1" }}
        >
          {source}
        </span>
        <img src={imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <a
            href={newsUrl}
            className="btn btn-primary btn-sm"
            target="_blank"
            rel="noreferrer"
          >
            Read More
          </a>
          <p className="text-muted" style={{ margin: "15px 0 5px 0" }}>
            Published by <strong>{author}</strong>{" "}
            <span className="badge bg-secondary">{date.toGMTString()}</span>
          </p>
        </div>
      </div>
    );
  }
}

export default NewsItem;

// d297cdd389974869a30ea0a8843524f0
