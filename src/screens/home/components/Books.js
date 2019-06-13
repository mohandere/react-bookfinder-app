import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isEmpty from 'lodash/isEmpty'
import Card from 'react-bootstrap/Card'


const renderBooksList = (data, query) => {
  if (isEmpty(data)) {
    return null;
  }
  let { items: books, totalItems, kind } = data;
  let booksList = books.map(book => {
    let { title, imageLinks, infoLink } = book.volumeInfo;
    return (
      <div key={book.id} className="book">
        <Card>
          <Card.Img variant="top" src={imageLinks.thumbnail} />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <a className="book" href={infoLink} target="_blank" rel="noopener">View</a>
          </Card.Body>
        </Card>
      </div>
    )
  })
  return (
    <>
      <h3>Search results for: {query}</h3>
      <p>Total results: {totalItems}</p>
      <p>Kind: {kind}</p>
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