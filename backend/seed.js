const mongoose = require('mongoose');
const Item = require('./models/Item');
require('dotenv').config();

const items = [
    { name: 'Diamond', value: 600, weight: 5, image: '💎' },
    { name: 'Gold Bar', value: 500, weight: 10, image: '💰' },
    { name: 'Ancient Vase', value: 400, weight: 4, image: '🏺' },
    { name: 'Painting', value: 700, weight: 7, image: '🖼️' },
    { name: 'Jewelry Box', value: 1000, weight: 2, image: '💍' },
    { name: 'Scepter', value: 850, weight: 6, image: '👑' },
    { name: 'Silver Goblet', value: 300, weight: 3, image: '🍷' },
    { name: 'Rare Stamp', value: 2500, weight: 1, image: '📜' },
    { name: 'Golden Watch', value: 900, weight: 2, image: '⌚' },
];

const seedDB = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');
    
    await Item.deleteMany({});
    console.log('Cleared existing items.');

    await Item.insertMany(items);
    console.log('Database seeded with new items!');
    
    mongoose.connection.close();
};

seedDB().catch(err => {
    console.error(err);
    mongoose.connection.close();
});