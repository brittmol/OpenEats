import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import { getRestaurants, getOneRestaurant } from "../../store/restaurants";
import CreateResForm from "../Reservations/CreateRes";
import "./Restaurants.css";
import StarRating from "../Reviews/StarRating";

export default function OneRestaurant() {
  const dispatch = useDispatch();
  const { restId } = useParams();

  useEffect(() => {
    dispatch(getOneRestaurant(restId))
    if (!rest) return <Redirect to={`/restaurants/${restId}/page-not-found`} />;
  }, [dispatch, restId]);

  const sessionUser = useSelector((store) => store.session.user);
  const rest = useSelector((store) => store.restaurantReducer[restId]);
  // const restaurants = useSelector((store) => store.restaurantReducer);
  // const rest = restaurants[restId];

  // const [loaded, setLoaded] = useState(false);

  // useEffect(() => {
  //   dispatch(getRestaurants()).then(() => setLoaded(true));
  // }, [dispatch]);

  return (
    <>
      {/* {restId && !rest ? (
        <Redirect to={`/restaurants/${restId}/page-not-found`} />
      ) : null} */}
      {/* {loaded && !rest ? (
        <Redirect to={`/restaurants/${restId}/page-not-found`} />
      ) : ( */}
      <div className="one-rest-page">
        <div>
          <img
            src={rest?.image}
            alt="Not Found"
            onError={(e) =>
              (e.target.src =
                "https://hesolutions.com.pk/wp-content/uploads/2019/01/picture-not-available.jpg")
            }
            // alt="https://wallpaperaccess.com/full/1322048.jpg"
          />
        </div>
        <div className="info">
          <div className="left-panel">
            <div className="panel-header">Overview of Restaurant Details</div>
            <h1 className="title">{rest?.title}</h1>
            {sessionUser && sessionUser?.id === rest?.User?.id ? (
              <button className="red-btn" style={{ marginBottom: "20px" }}>
                <Link to={`/restaurants/${rest?.id}/edit`}>
                  Want to update?
                </Link>
              </button>
            ) : null}
            <div className="text">
              <div>{rest?.Category?.type}</div>
              <StarRating />
              <div>{rest?.description}</div>
              {/* <div>Reviews:</div> */}
            </div>
          </div>
          <div className="right-panel">
            <CreateResForm restId={restId} sessionUser={sessionUser} />
            <div className="address">
              {rest?.address} {rest?.city}, {rest?.state} {rest?.zipCode}
            </div>
          </div>
        </div>
      </div>
      // )}
    </>
  );
}
