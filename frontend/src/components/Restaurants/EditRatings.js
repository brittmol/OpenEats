export const avgRatings = (rest) => {
  const reviews = rest?.Reviews;

  if (reviews?.length) {
    const overallRatingsArr = reviews?.map((rev) => rev?.ratingOverall);
    const avg = (
      overallRatingsArr?.reduce((a, b) => a + b) / overallRatingsArr?.length
    ).toFixed(1);
    return avg;
  }
};
