import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import isEmpty from 'lodash/isEmpty'
import uniq from 'lodash/uniq'
import indexOf from 'lodash/indexOf'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const renderBooksList = (data, query) => {
  if (isEmpty(data)) {
    return null;
  }
  let { items: books, totalItems, kind } = data;
  let booksList = books.map(book => {
  let {
    title,
    subtitle,
    imageLinks,
    infoLink,
    description
  } = book.volumeInfo;

    return (
      <div key={book.id} className="book">
        <Card>
          {imageLinks
            ? <Card.Img variant="top" src={imageLinks.thumbnail} />
            : null
          }
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle>{subtitle}</Card.Subtitle>
            <Card.Text className="book--description">{description}</Card.Text>
            {/* <Card.Link href={infoLink} target="_blank" rel="noopener">Preview</Card.Link> */}
            <Link className="book" to={`/book/${book.id}`}>View</Link>
          </Card.Body>
        </Card>
      </div>
    )
  })
  return (
    <>
      <h3>Search results for: {query}</h3>
      <p>Total results: {totalItems}</p>
      <div className="books-list">
        {booksList}
      </div>
    </>
  )
}


const Books = ({ data, isFetching, query, error }) => {
  let jsxStr = ''

  if (isFetching) {
    jsxStr = <p>Loading...</p>
  } else if (!isEmpty(error)) {
    jsxStr = JSON.stringify(error)
  } else {
    jsxStr = renderBooksList(data, query);
  }
  return (
    <div className="books">
      {jsxStr}
    </div>
  )
}

const mapStateToProps = (state) => {
  let { data, isFetching, query, error } = state.books
  return {
    data,
    isFetching,
    query,
    error
  }
}

export default connect(
  mapStateToProps,
  null
)(Books);