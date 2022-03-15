"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Restaurants",
      [
        {
          ownerId: 1, // demo
          categoryId: 8, // Italian
          title: "Anacapri",
          description:
            "Anacapri’s Italian cuisine is full of the kind of simple, unforgettable dishes that keep regulars coming back. The casual but fine-dining atmosphere will provide you with the perfect venue whether you’re out for a romantic evening or celebrating with your friends. It is elegant yet familiar and once you’re here, you’re family. As the past, present, and future generation in Italian food, Anacapri’s cuisine will never go out of style.",
          address: "12669 S. Dixie Hwy.",
          city: "Miami",
          state: "FL",
          zipCode: 33156,
          ratingOverall: null,
          ratingFood: null,
          ratingService: null,
          ratingAmbience: null,
        },
        {
          ownerId: 1, // demo
          categoryId: 9, // Japanese
          title: "Benihana",
          description:
            "Welcome to Benihana and a dining experience unlike any other! Our guests are seated at communal tables in groups, where your personal chef will perform the ancient art of Teppanyaki. Watch as we slice and dice, preparing a meal that will dazzle your eyes as well taste buds, whether you choose mouth-watering steak, tender chicken or succulent seafood. You can also enjoy sushi prepared by a talented sushi chef and indulge in a specialty cocktail. Benihana Coral Gables is located on Miracle Mile in beautiful Downtown Coral Gables, within walking distance of the hottest shops and the lively culture of Coral Gables. We are also five miles from Brickell, and less than four miles from the University of Miami.",
          address: "242 Miracle Mile",
          city: "Miami",
          state: "FL",
          zipCode: 33134,
          ratingOverall: null,
          ratingFood: null,
          ratingService: null,
          ratingAmbience: null,
        },
        {
          ownerId: 1, // demo
          categoryId: 17, // Steakhouse
          title: "Perry's Steakhouse & Grille",
          description:
            "Come see Florida’s first Perry’s Steakhouse & Grille® location in Coral Gables. Located in The Shops of Merrick Park, Perry’s is merging ambiance, history and our award-winning, redefined steakhouse signatures with that of Coral Gables, including our award-winning menu, tableside presentations, vibrant Bar 79® and exceptional service. Showcasing our newest look complete with a large patio, fire element and both outdoor lounge and dining seating — Perry’s is the perfect place to soak up beautiful Florida weather. Perry’s Coral Gables is also embracing the community’s art focus and coastal heritage in parts of our design, including a gold barnacle art installation in the main dining room. We are so excited to serve the best of Perry’s to “The City Beautiful” in Florida!",
          address: "4251 Salzedo St.",
          city: "Miami",
          state: "FL",
          zipCode: 33146,
          ratingOverall: null,
          ratingFood: null,
          ratingService: null,
          ratingAmbience: null,
        },
        {
          ownerId: 1, // demo
          categoryId: 4, // Cuban
          title: "La Rosa Restaurant",
          description:
            "Since 1968 La Rosa Restaurant has been near the Miami International Airport with more than just cuban cuisine! The restaurant’s dishes, desserts, drinks and exceptional service, will be the highlight of your day.",
          address: "4041 Nw 7th St",
          city: "Miami",
          state: "FL",
          zipCode: 33126,
          ratingOverall: null,
          ratingFood: null,
          ratingService: null,
          ratingAmbience: null,
        },
        {
          ownerId: 1, // demo
          categoryId: 12, // Mexican
          title: "Pink Taco",
          description:
            "At Pink Taco, we keep it real. We all have a variety of food moods, so our playfully presented menu provides. It's simple: epic food, great drinks, and a good time. Join us for Taco Tuesday, Happy Hour and Brunch!",
          address: "1200 Ocean Dr",
          city: "Miami",
          state: "FL",
          zipCode: 33139,
          ratingOverall: null,
          ratingFood: null,
          ratingService: null,
          ratingAmbience: null,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Restaurants", null, {});
  },
};
