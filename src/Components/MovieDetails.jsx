import { useParams } from "react-router-dom";
import MyNavBar from "./MyNavbar";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
} from "react-bootstrap";
import CustomComment from "./CustomComment";

const MovieDetails = (props) => {
  const params = useParams();
  const [movie, setMovie] = useState({});
  const [comments, setComments] = useState([]);
  const [isError, setError] = useState(false);

  const movieUrl = ` http://www.omdbapi.com/?apikey=895d39b1&i=${params.movieId}`;
  const movieCommentsUrl = `https://striveschool-api.herokuapp.com/api/comments/${params.movieId}`;

  const fetchMovie = () => {
    fetch(movieUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then((data) => {
        console.log(data);
        setMovie(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchComments = () => {
    const myKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjJmOGE2NjI4MzJlODAwMTk4NzMwOWEiLCJpYXQiOjE3MTQzOTE2NTQsImV4cCI6MTcxNTYwMTI1NH0.8LJndh4fAd8e9THgG8NnG1HZNV-PJ1_p9RlB9odR_Hc";

    fetch(movieCommentsUrl, {
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then((comments) => {
        console.log(comments);
        setComments(comments);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };

  const deleteComment = (id) => {
    const myKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjJmOGE2NjI4MzJlODAwMTk4NzMwOWEiLCJpYXQiOjE3MTQzOTE2NTQsImV4cCI6MTcxNTYwMTI1NH0.8LJndh4fAd8e9THgG8NnG1HZNV-PJ1_p9RlB9odR_Hc";

    fetch(`https://striveschool-api.herokuapp.com/api/comments/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then((data) => {
        console.log(data);
        fetchComments();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchMovie();
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <MyNavBar />
      <Container>
        <Row>
          <Col lg={3}>
            <Card>
              <Card.Img
                variant="top"
                src={movie.Poster}
                alt={movie.Title}
                className="img-details"
              />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Plot}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  <strong>Year:</strong> {movie.Year}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong> Rated: </strong> {movie.Rated}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong> Released: </strong> {movie.Released}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong> Runtime: </strong> {movie.Runtime}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong> Actors: </strong> {movie.Actors}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong> Genre: </strong> {movie.Genre}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong> Ratings: </strong> {movie.imdbRating}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong> Awards: </strong> {movie.Awards}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col lg={9}>
            {isError ? (
              <Alert variant="danger">
                Something went wrong with the API Comments
              </Alert>
            ) : (
              <div>
                <h2 className="text-white"> Comments:</h2>
                {comments.length === 0 && (
                  <Alert variant="warning">There are no comments yet</Alert>
                )}
                <ListGroup as="ol" className="my-3 commentList">
                  {comments.map((comment, index) => (
                    // {comments.length === 0 && (<p>There are no comments yet</p>)}

                    <ListGroup.Item
                      key={comment._id}
                      as="li"
                      className="d-flex align-items-center justify-content-between gap-3"
                    >
                      <div>
                        <p className="m-0" style={{ wordBreak: "break-all" }}>
                          {index + 1}. <strong>Comment: </strong>
                          {comment.comment} -<strong> Rate: </strong>
                          {comment.rate}
                        </p>
                      </div>
                      <div>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deleteComment(comment._id)}
                        >
                          <i className="bi bi-trash3"></i>
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <CustomComment
                  movieId={params.movieId}
                  fetchComments={fetchComments}
                />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MovieDetails;

// {
//     "Title": "Beast Wars: Transformers",
//     "Year": "1996–1999",
//     "Rated": "TV-Y7",
//     "Released": "16 Sep 1996",
//     "Runtime": "58S min",
//     "Genre": "Animation, Action, Adventure",
//     "Director": "N/A",
//     "Writer": "N/A",
//     "Actors": "Scott McNeil, Garry Chalk, Ian James Corlett",
//     "Plot": "The Transformers' war continues in an older time, through a new generation. On pliocenic Earth, the heroic Maximals and the evil Predacons battle for survival against each other and against a violent planet.",
//     "Language": "English",
//     "Country": "Canada, United States",
//     "Awards": "1 win & 1 nomination",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BNDUxODg4MzE5NV5BMl5BanBnXkFtZTYwNDA0OTc4._V1_SX300.jpg",
//     "Ratings": [
//         {
//             "Source": "Internet Movie Database",
//             "Value": "8.1/10"
//         }
//     ],
//     "Metascore": "N/A",
//     "imdbRating": "8.1",
//     "imdbVotes": "8,614",
//     "imdbID": "tt0115108",
//     "Type": "series",
//     "totalSeasons": "3",
//     "Response": "True"
// }
