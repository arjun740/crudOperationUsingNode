const Food = require('./../model/foodDataModel')
const catchAsync = require('./../util/catchAsync')

exports.getAllFood = catchAsync(async (req,res ,next) =>{
    const foodData = await Food.find();
    if(!foodData){
        return next();
    }
    res.status(200).json({
        status: "success",
        results: foodData.length,
        data: {
            foodData
        }
    })
})

exports.getFood = catchAsync(async (req,res,next) => {
    const id = req.params.id;
    const foodData = await Food.findById(id);
    if(!foodData){
        res.status(404).json({
            status: `Could not find food with the associated ID ${id}`
        })
    }
    res.status(200).json({
        status:`Successfully retrieve the Food data associated with this ID ${id}`,
        data: {
            foodData
        }
    })
})

exports.createNewfood = catchAsync(async (req,res,next) => {
    const data  = await Food.create(req.body);
    res.status(201).json({
        status: "Food created successful",
        data:{
            data
        }
    })

})

exports.updateFood = catchAsync(async (req,res,next) => {

    const food = await Food.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true
    })
    if(!food){
        res.status(404).json({
            status: `Could not find food with the associated ID ${req.params.id}`,
        })
    }
    res.status(200).json({
        status:`successfully updated the food data with given data ${req.params.id}`,
        data:{
            food
        }
    })
})

exports.deleteFood = catchAsync(async (req, res, next) => {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) {
        return res.status(404).json({
            status: `Could not find food with the associated ID ${req.params.id}`,
        });
    }
    res.status(200).json({
        status: `Successfully deleted the food data with the given ID ${req.params.id}`,
        data: {
            food,
        },
    });
});


