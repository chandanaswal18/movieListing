import React from 'react';
import Title from './Title';
import Description from './Description';
import { Row, Col } from 'react-bootstrap';

export default function MovieInfo(props) {
  const style = {
    paddingLeft: '15px'
  };
  const colorStyle = { color: 'darkred', marginLeft: '10px' };

  return (
    <div style={style}>
      <Row style={{ marginBottom: 30, marginTop: 30 }}>
        <Title title={props.movie.title} />
      </Row>
      <Row>
        <h4>
          Movie Release Year:
          <span style={colorStyle}>{props.movie.release_date}</span>
        </h4>
      </Row>
      <Row>
        <h4>
          Movie Rating:
          <span style={colorStyle}>{props.movie.vote_average}</span>
        </h4>
      </Row>
      <Row>
        <h4>
          Movie Budget:
          <span style={colorStyle}>{props.movie.budget}</span>
        </h4>
      </Row>
      <Row style={{marginTop: 30}}>
        <Description category={'Overview'} description={props.movie.overview} />
      </Row>
    </div>
  );
}
