const mongoose = require('mongoose');
const slugify = require('slugify');

const foodSchema = new mongoose.Schema({
    allergens: {
        type: [String],
        default: ["None"]
    },
    food_group: {
        type: String,
        required: [true, 'Food group is required']
    },
    description: String,
    ingredients: {
        type: [String],
        required: [true, 'Ingredients are required']
    },
    serving_size: String,
    certifications: {
        type: [String],
        default: []
    },
    food_item_name: {
        type: String,
        required: [true, 'Food item name is required']
    },
    health_benefits: {
        type: [String],
        default: []
    },
    country_of_origin: String,
    preparation_methods: {
        type: [String],
        default: []
    },
    dietary_restrictions: {
        type: [String],
        default: []
    },
    brand_or_manufacturer: String,
    nutritional_information: {
        fat: {
            type: Number,
            min: [0, 'Fat cannot be negative'],
        },
        fiber: {
            type: Number,
            min: [0, 'Fiber cannot be negative'],
        },
        protein: {
            type: Number,
            min: [0, 'Protein cannot be negative'],
        },
        calories: {
            type: Number,
            min: [0, 'Calories cannot be negative'],
        },
        carbohydrates: {
            type: Number,
            min: [0, 'Carbohydrates cannot be negative'],
        }
    }
});

foodSchema.pre('save', function(next) {
    this.slug = slugify(this.food_item_name, { lower: true });
    next();
});


foodSchema.pre(/^find/, function(next) {
    this.start = Date.now();
    next();
});

foodSchema.post(/^find/, function(docs, next) {
    console.log(`Query took ${Date.now() - this.start} milliseconds!`);
    next();
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
