import React, { useState, useEffect } from 'react';
import axios from 'axios'
import isEmpty from 'lodash/isEmpty'
import './book.css'


const createMarkup = (markup) => ({__html: markup});

const Book = ({ match: { params } }) => {

  const [bookInfo, setBookInfo] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    setIsFetching(true)
    axios.get(`https://www.googleapis.com/books/v1/volumes/${params.ID}`)
    .then(response => {
      setBookInfo(response.data);
    })
    .catch(() => {
      setBookInfo({});
    })
    .finally(() => {
      setIsFetching(false)
    })

  }, [params.ID]);

  let jsxStr = ''
  if (isFetching) {
    jsxStr = (
      <p>Loading...</p>
    )
  }

  if (!isEmpty(bookInfo)) {
    let {
      title,
      subtitle,
      imageLinks,
      description
    } = bookInfo.volumeInfo;

    jsxStr = (
      <div className="book-card">
        <h1>{title}</h1>
        <h3>{subtitle}</h3>
        <div className="book-card--body">
          <figure className="book-card--thumbnail">
            {imageLinks
              ? <img
                src={imageLinks.thumbnail}
                className="img-responsive"
                alt={title}
                />
              : null
            }
          </figure>
          <p className="book-card--description" dangerouslySetInnerHTML={createMarkup(description)} />
        </div>
      </div>
    )
  }

  return (
    <div id="book" className="page">
      <div className="container">
        {jsxStr}
      </div>
    </div>
  )
}
export default Book;