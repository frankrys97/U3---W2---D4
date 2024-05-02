import { useState } from "react";
import MyCarousel from "./MyCarousel";
import MyNavBar from "./MyNavbar";

const TvShows = () => {
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  const handleGet = () => {
    setError(false);
  };
  return (
    <div>
      <MyNavBar />
      <MyCarousel
        title="Batman"
        search="batman"
        onError={handleError}
        onGet={handleGet}
      />
      <MyCarousel
        title="Twilight"
        search="twilight"
        onError={handleError}
        onGet={handleGet}
      />
      <MyCarousel
        title="Toy Story"
        search="Toy Story"
        onError={handleError}
        onGet={handleGet}
      />
      <MyCarousel
        title="Avengers"
        search="Avengers"
        onError={handleError}
        onGet={handleGet}
      />
      <MyCarousel
        title="Plutone"
        search="Plutone"
        onError={handleError}
        onGet={handleGet}
      />
    </div>
  );
};

export default TvShows;
