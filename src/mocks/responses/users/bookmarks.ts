export default {
  content: {
    dish: [
      {
        id: 1,
        restaurantId: 1,
        name: "Truffle Mushroom Risotto",
        description: "Creamy Arborio rice with wild mushrooms and black truffle",
        price: 28.5,
        simpleRating: 4.8,
        reviewPhotos: []
      },
      {
        id: 2,
        restaurantId: 1,
        name: "Margherita Pizza",
        description: "Classic Neapolitan style with San Marzano tomatoes",
        price: 16.0,
        simpleRating: 4.5,
        reviewPhotos: []
      }
    ],
    restaurant: [
      {
        id: 1,
        name: "La Trattoria",
        address: "123 Italian Street, Downtown",
        cuisine: "Italian",
        isHalal: false,
        lat: 1.3521,
        lon: 103.8198,
        openingHours: "11:00-22:00",
        createdAt: "2024-06-23T20:14:37.461741",
        updatedAt: "2025-01-15T10:30:00.000000",
        status: "ACTIVE",
        distance: 1.2,
        totalReviews: 247,
        averageRating: 4.6
      }
    ]
  },
  pageable: {
    pageNumber: 0,
    pageSize: 40,
    sort: {
      empty: false,
      sorted: true,
      unsorted: false
    },
    offset: 0,
    paged: true,
    unpaged: false
  },
  totalPages: 1,
  totalElements: 3,
  last: true,
  first: true,
  number: 0,
  size: 40,
  numberOfElements: 3,
  empty: false
};
