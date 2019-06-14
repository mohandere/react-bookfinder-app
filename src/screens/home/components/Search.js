import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getBooks } from '../actions'
import debounce from 'lodash/debounce'

const Search = ({ getBooks, query }) => {

  const handleOnSubmit = (e) => {
    e.preventDefault();
  }
  const debouncedGetBooks = debounce(query => {
    getBooks(query);
  }, 700);

  const onInputChange = e => {
    debouncedGetBooks(e.target.value)
  }

  return (
    <div className="search-books">
      <Form className="search-books--form" onSubmit={handleOnSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Control type="text" onChange={onInputChange} placeholder="Harry Potter, Food and Love" />
          <Form.Text className="text-muted">
            Search the world's most comprehensive index of full-text books.
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
    </div>
  )
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    query: state.books.query
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getBooks
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);