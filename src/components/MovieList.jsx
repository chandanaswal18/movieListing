import React, { Component } from 'react';
import Poster from './Poster';
import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';

export default class MovieList extends Component {
  constructor() {
    super();
    this.state = {
      value: ''
    };
  }

  handleChange = () => {
    console.log("button clicked")
  };

  render() {
    const style = {
      display: 'flex',
      flexWrap: 'wrap'
    };

    let movies = this.props.movies
      .filter(function(movie) {
        return movie.poster_path != null;
      })
      .map(function(movie) {
        return (
          <div style={{ margin: 1 }}>
            <div style={{ marginBottom: 20, textAlign: 'center' }}>
              <strong>{movie.title}</strong>
            </div>
            <Col xs={6} sm={4} md={3} key={movie.id}>
              <Link to={'/movie/' + movie.id}>
                <Poster
                  info
                  id={movie.id}
                  path={movie.poster_path}
                  title={movie.title}
                  voteAverage={movie.vote_average}
                  release_date={movie.release_date}
                  responsive
                />
              </Link>
            </Col>
            <input
              style={{ marginLeft: 15, marginTop: 15, border: 'none' }}
              type="button"
              value="LIKE"
              id="myButton1"
            />
            <input
              style={{ float: 'right', marginRight: 15, marginTop: 15, border: 'none' }}
              type="button"
              value="OWN"
              id="myButton2"
            />
          </div>
        );
      });

    return (
      <Grid fluid={false}>
        <Row style={style}>{movies}</Row>
      </Grid>
    );
  }
}
// dodgerblue;
