import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  articles = [
    {
      source: {
        id: null,
        name: "YouTube",
      },
      author: null,
      title:
        "Two officers shot and killed in El Monte while responding to a possible stabbing - CBS Los Angeles",
      description:
        "According to the Los Angeles County Fire Department, law enforcement transported the two officers to a hospital in unknown conditions. They died later that e...",
      url: "https://www.youtube.com/watch?v=Luu09PMGTHc",
      urlToImage: "https://i.ytimg.com/vi/Luu09PMGTHc/hqdefault.jpg",
      publishedAt: "2022-06-15T03:25:59Z",
      content: null,
    },
    {
      source: {
        id: "financial-times",
        name: "Financial Times",
      },
      author: null,
      title:
        "Live news updates: South Korean agency behind BTS sinks after band announces hiatus - Financial Times",
      description:
        "News, analysis and comment from the Financial Times, the worlds leading global business publication",
      url: "https://www.ft.com/content/51bc0be8-7e46-4691-af1a-a5bca0003068",
      urlToImage:
        "https://a4.espncdn.com/combiner/i?img=%2Fphoto%2F2022%2F0615%2Fr1025300_1296x729_16%2D9.jpg",
      publishedAt: "2022-06-15T03:00:23Z",
      content:
        "Expert insights, analysis and smart data help you cut through the noise to spot trends,\r\nrisks and opportunities.\r\nJoin over 300,000 Finance professionals who already subscribe to the FT.",
    },
    {
      source: {
        id: null,
        name: "ESPN",
      },
      author: null,
      title:
        "St. Louis Cardinals pitcher Miles Mikolas loses no-hitter in ninth and 'it kinda stinks to not finish' - ESPN",
      description:
        "Cardinals starter Miles Mikolas narrowly missed a no-hitter against the Pittsburgh Pirates in the second game of a doubleheader Tuesday night, allowing only an unearned run and one hit in St. Louis' 9-1 win, which completed the sweep for the home team.",
      url: "https://www.espn.com/mlb/story/_/id/34093904/st-louis-cardinals-pitcher-miles-mikolas-loses-no-hitter-ninth-inning-pittsburgh-pirates",
      urlToImage:
        "https://a4.espncdn.com/combiner/i?img=%2Fphoto%2F2022%2F0615%2Fr1025300_1296x729_16%2D9.jpg",
      publishedAt: "2022-06-15T02:35:10Z",
      content:
        "ST. LOUIS -- Cardinals right-hander Miles Mikolas fell one strike short of a no-hitter against the Pittsburgh Pirates when Cal Mitchell doubled with two outs in the ninth inning Tuesday night.\r\nMitch… [+3596 chars]",
    },
    {
      source: {
        id: "reuters",
        name: "Reuters",
      },
      author: null,
      title:
        "Russia tells Ukraine to lay down arms in Sievierodonetsk battle - Reuters.com",
      description:
        "Russia told Ukrainian forces holed up in a chemical plant in embattled Sievierodonetsk to lay down their arms by early Wednesday as it fights to maintain momentum in its battle for control of eastern Ukraine.",
      url: "https://www.reuters.com/world/europe/russia-tells-ukraine-lay-down-arms-sievierodonetsk-battle-2022-06-14/",
      urlToImage:
        "https://www.reuters.com/resizer/J4Um05H5NL0d7CYqE5avaU0BScg=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/UCZVEY27BVO7FAZIBHY3UAW63Q.jpg",
      publishedAt: "2022-06-14T22:27:00Z",
      content:
        "KYIV, June 15 (Reuters) - Russia told Ukrainian forces holed up in a chemical plant in embattled Sievierodonetsk to lay down their arms by early Wednesday as it fights to maintain momentum in its bat… [+4762 chars]",
    },
  ];
  constructor() {
    super();
    console.log("Nice");
    this.state = {
      articles: this.articles,
      loading: false,
    };
  }
  render() {
    return (
      <div className="container my-3">
        <h2> NewsMonkey - Top headlines </h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-3" key={element.url}>
                <NewsItem
                  title={element.title.slice(50)}
                  description={element.description.slice(0, 100)}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default News;
