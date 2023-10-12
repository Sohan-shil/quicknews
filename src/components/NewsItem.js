import React from "react";

const NewsItem = (props)=> {
  
    let { title, description, imageUrl, newsUrl, author, date, source } = props;

    return (
      <div>
        <div className="card mb-5">
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-success" style={{zIndex:1, left:'89%'}}>{source}</span>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-body-secondary">
                Author: {!author ? "Unknown" : author} <br /> Published:{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              rel="noreferrer"
              target="_blank"
              className="btn btn-sm btn-success"
            >
              Read More...
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItem;
