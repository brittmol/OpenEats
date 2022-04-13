export const avgRating = (rest) => {
  const reviews = rest?.reviews
  if (reviews?.length) {
    const overallRatingsArr = reviews?.map((rev) => rev?.ratingOverall);
    const avg = (overallRatingsArr?.reduce((a, b) => a + b) / overallRatingsArr?.length).toFixed(1)
    return avg;
  }

}
