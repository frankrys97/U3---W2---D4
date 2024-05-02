// import { Component, useEffect, useState } from "react";
import {
  Alert,
  Container,
  OverlayTrigger,
  Popover,
  Spinner,
} from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Carousel = (props) => {
  // state = {
  //   movies: [],
  //   isLoading: false,
  //   isError: false,
  // };

  const [movies, setMovies] = useState([]);
  const [isError, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchMovies = () => {
    const movieUrl = `http://www.omdbapi.com/?i=tt3896198&apikey=895d39b1&s=${props.search}`;

    // this.setState({ isLoading: true });
    setIsLoading(true);
    fetch(movieUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
      .then((data) => {
        // data.Search && this.setState({ movies: data.Search });
        data.Search && setMovies(data.Search);
        console.log(data);

        props.onGet();
      })
      .catch((error) => {
        console.log(error);
        // this.setState({ isError: true });
        setError(true);
        props.onError();
      })
      .finally(() => {
        // this.setState({ isLoading: false });
        setIsLoading(false);
      });
  };

  // componentDidMount() {
  //   this.fetchMovies();
  // }

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 6,
    speed: 500,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  if (isError) {
    return null;
  }

  // Ho preferito optare per una gestione diversa del caso dell'errore poichè a livello di UI preferivo che se la fetch
  // avesse avuto qualche bug venisse visualizzato un singolo messaggio di errore nella pagina e non una per ogni singola
  // chiamata.
  // A differenza di quando ci torna un array vuoto che in quel caso ho preferito gestire
  // singolarmente le chiamate indicando che per quella saga non erano disponibili titoli.

  return (
    <Container className="my-3">
      <h3 className="text-white">{props.title}</h3>
      {isLoading && <Spinner animation="border" variant="danger" />}
      {movies.length === 0 && !isLoading && (
        <Alert variant="info">
          There are no movies for <strong>{props.search}</strong>
        </Alert>
      )}

      {!isLoading && movies.length > 0 && (
        <div className="slider-container">
          <Slider {...settings}>
            {movies.map((movie) => (
              <div key={movie.imdbID} className="slider-item">
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={
                    <Popover
                      data-bs-theme="dark"
                      onClick={() => navigate(`/movie-details/${movie.imdbID}`)}
                    >
                      <Popover.Header as="h3" className="text-white">
                        <h5>Clicca per dettagli</h5>
                        <p>
                          {movie.Title} - {movie.Year}
                        </p>
                      </Popover.Header>
                      <Popover.Body>
                        <img
                          src={movie.Poster}
                          alt={movie.Title}
                          className="img-fluid"
                        />
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <img
                    className="carousel-img img-fluid"
                    src={movie.Poster}
                    alt={movie.Title}
                  />
                </OverlayTrigger>
                {/* Ho dato alle immagini un aspect ratio di 3/4 per renderle visivamente più leggibili in quanto l'API
                  ci forniva immagini in formato verticale, quindi se avessimo optato per un layout simile a quello
                  di Netflix, le immagini sarebbero state tagliate in modo "brutale" */}
              </div>
            ))}
          </Slider>
        </div>
      )}
    </Container>
  );
};

export default Carousel;
