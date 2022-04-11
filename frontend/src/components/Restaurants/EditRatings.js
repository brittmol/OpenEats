import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { updateRestaurant, getRestaurants } from "../../store/restaurants";

export default function EditRatings() {
  return (
    <>
      <h1>Edit Restaurant Ratings</h1>
    </>
  );
}
