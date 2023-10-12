import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
// import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props)=> {
  
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async ()=> {
    props.setProgress(20);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    props.setProgress(50);
    let data = await fetch(url);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setLoading(false);
    setTotalResults(parsedData.totalResults);
    props.setProgress(100);
  }

  // const fetchData = async () => {
  //   const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
  //   setPage(page+1) 
  //   let data = await fetch(url);
  //   let parsedData = await data.json()
  //   setArticles(articles.concat(parsedData.articles))
  //   setTotalResults(parsedData.totalResults)
  // }


  useEffect(() => {
    updateNews()
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    // eslint-disable-next-line 
  }, [])
  

  const handlePrevClick = async () => {
    setPage (page - 1 )
    updateNews();
  };

  const handleNextClick = async () => {
    setPage (page + 1 )
    updateNews();
  };

  
    return (
      <div className="container my-4">
        <h1 className="text-center" style={{marginTop: '70px', marginBottom:'30px'}}>Top Headlines- {capitalizeFirstLetter(props.category)} </h1>
        {loading && <Spinner />}

        {/* <InfiniteScroll
          dataLength={articles.length} 
          next={fetchData}
          hasMore={true}
          loader={<Spinner/>}> */}

        <div className="row">
          {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>

        {/* </InfiniteScroll> */}

        <div className="container d-flex justify-content-between">
          <button disabled={page<=1} type="button" className="btn btn-success" onClick={handlePrevClick}>&larr; Previous</button>
    
          <button disabled={page+1 > Math.ceil(totalResults/props.pageSize)} type="button"  className="btn btn-success" onClick={handleNextClick}>Next &rarr;</button>
        </div> 
      </div>
    );
}

News.defaultProps = {
  country: "in",
  pageSize: 9,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;


