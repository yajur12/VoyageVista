import React from "react";
import TourCard from "../../shared/TourCard";
import { Col } from "reactstrap";

import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";

const FeaturedTourList = () => {
  const {
    data: featuredTours,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours/search/getFeaturedTours`); // which is likely a server-side API endpoint that returns a list of featured tours

//   featuredTours: the list of featured tours fetched from the server
// loading: a boolean indicating whether the data is still being fetched
// error: an error object if the fetch request fails

  return (
    <>
      {loading && <h4>Loading.........</h4>}
      {error && <h4>{error}</h4>}
      {!loading &&
        !error &&
        featuredTours?.map((tour) => (
          <Col lg="3" md='6' sm='6' className="mb-4" key={tour._id}>
            <TourCard tour={tour} />
          </Col>
        ))}
    </>
  );
};

export default FeaturedTourList;
