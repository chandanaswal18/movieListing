import React, { Component } from 'react';
import { MovieList, DisplayMsg } from '../components';
import { connect } from 'react-redux';
import { fetchMovieList, searchMovieList } from '../actions';
import Pagination from 'react-paginating';

const limit = 3;
const pageCount = 3;
const buttonStyle = { marginLeft: '10px' };

class MovieContainer extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      startFrom: 0,
      endTo: 3
    };
  }
  componentDidMount() {
    if (!this.props.params.keyword) {
      const { dispatch } = this.props;
      dispatch(fetchMovieList());
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { dispatch } = this.props;
    if (nextProps.params.keyword && this.props.params.keyword !== nextProps.params.keyword) {
      dispatch(searchMovieList(nextProps.params.keyword));
    }
  }

  handlePageChange = page => {
    this.setState({
      currentPage: page,
      startFrom: (page - 1) * 3,
      endTo: (page - 1) * 3 + 3
    });
  };

  render() {
    const { movies } = this.props;
    const total = movies.length;
    const { currentPage } = this.state;
    if (movies.length > 0) {
      return (
        <div>
          <div style={{ marginTop: 100 }}>
            <MovieList movies={movies.slice(this.state.startFrom, this.state.endTo)} />
          </div>
          <div style={{ textAlign: 'center', marginTop: 50 }}>
            <Pagination total={total} limit={limit} pageCount={pageCount} currentPage={currentPage}>
              {({
                pages,
                currentPage,
                hasNextPage,
                hasPreviousPage,
                previousPage,
                nextPage,
                totalPages,
                getPageItemProps
              }) => (
                <div>
                  <button
                    style={{ marginLeft: 10, marginRight: 10 }}
                    {...getPageItemProps({
                      pageValue: 1,
                      onPageChange: this.handlePageChange
                    })}
                  >
                    first
                  </button>

                  {hasPreviousPage && (
                    <button
                      style={{ marginLeft: 10, marginRight: 10 }}
                      {...getPageItemProps({
                        pageValue: previousPage,
                        onPageChange: this.handlePageChange
                      })}
                    >
                      {'<'}
                    </button>
                  )}

                  {pages.map(page => {
                    let activePage = null;
                    if (currentPage === page) {
                      activePage = { backgroundColor: '#fdce09' };
                    }
                    return (
                      <button
                        style={buttonStyle}
                        key={page}
                        style={activePage}
                        {...getPageItemProps({
                          pageValue: page,
                          onPageChange: this.handlePageChange
                        })}
                      >
                        {page}
                      </button>
                    );
                  })}

                  {hasNextPage && (
                    <button
                      style={buttonStyle}
                      {...getPageItemProps({
                        pageValue: nextPage,
                        onPageChange: this.handlePageChange
                      })}
                    >
                      {'>'}
                    </button>
                  )}

                  <button
                    style={buttonStyle}
                    {...getPageItemProps({
                      pageValue: totalPages,
                      onPageChange: this.handlePageChange
                    })}
                  >
                    last
                  </button>
                </div>
              )}
            </Pagination>
          </div>
        </div>
      );
    } else {
      return <DisplayMsg />;
    }
  }
}

function mapStateToProps(state, ownProps) {
  const { movieList } = state;
  const { isFetcing_movieList, items: movies, error_movieList } = movieList;

  const keyword = ownProps.params.keyword;
  return { movies, keyword };
}

export default connect(mapStateToProps)(MovieContainer);
