import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";

const apiUrl =
  "https://api.themoviedb.org/3/movie/popular?api_key=589f3d4f48689702b074a222aea6db87";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    try {
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          const firstFiveMovies = data.results.slice(0, 5);
          setMovies(firstFiveMovies);
          console.log("Fetched movies:", firstFiveMovies);
        });
    } catch (error) {
      console.error("Error fetching movies from TMDB:", error);
    }
  }, []);

  // const prevSlide = () => {
  //   setCurrentSlide((prevSlide) => {
  //     if (prevSlide === 0) {
  //       return movies.length - 1;
  //     } else {
  //       return prevSlide - 1;
  //     }
  //   });
  // };

  // const nextSlide = () => {
  //   setCurrentSlide((prevSlide) => {
  //     if (prevSlide === movies.length - 1) {
  //       return 0;
  //     } else {
  //       return prevSlide + 1;
  //     }
  //   });
  // };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? movies.length - 1 : prevSlide - 1,
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === movies.length - 1 ? 0 : prevSlide + 1,
    );
  };

  useEffect(() => {
    console.log("Current slide:", currentSlide);
  }, [currentSlide]);

  useEffect(() => {
    console.log("Movies:", movies);
  }, [movies]);

  return (
    <Carousel fade>
      <Carousel.Item>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
