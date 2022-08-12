const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedsHelper');
const Campground = require('../models/campground');
const campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '62ee74746b63b92608a6d3b5',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis, eligendi. Accusantium vel repellat nesciunt assumenda fuga quasi ipsa temporibus nulla iste tempore nobis, explicabo omnis alias illum consectetur dicta accusamus',
      price,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dwlgtygvs/image/upload/v1660313688/YelpCamp/ydmw2m6un1wwimo553ue.jpg',
          filename: 'YelpCamp/ydmw2m6un1wwimo553ue',
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
