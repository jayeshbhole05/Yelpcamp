const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        // const geoData = await geocoder.forwardGeocode({
        //     query: req.body.campground.location,
        //     limit: 1
        // }).send()
        // const campground = new Campground(req.body.campground);
        // campground.geometry = geoData.body.features[0].geometry;
        const camp = new Campground({
            author: '63e12ec4d2c9a8d91628b65c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/daj9evero/image/upload/v1675772856/YelpCamp/psllcdh6m8nzpcdxwl65.png',
                    filename: 'YelpCamp/psllcdh6m8nzpcdxwl65'       
                },
                {
                    url: 'https://res.cloudinary.com/daj9evero/image/upload/v1675773617/YelpCamp/xgebsigkvvas9xm8ko3k.jpg',
                    filename: 'YelpCamp/xgebsigkvvas9xm8ko3k',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})