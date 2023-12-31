import asyncHandler from "../middleware/asyncHandler.js";
import Product from '../models/productModel.js';


const getProducts = asyncHandler(async(req,res) =>{
    const pageSize = 3;
    const page = Number(req.query.pageNumber)||1;
    const count = await Product.countDocuments({});


    const products = await Product.find({})
        .limit(pageSize)
        .skip(pageSize*(page-1));
    res.json({products, page, pages:Math.ceil(count/pageSize)});
});

const getProductById = asyncHandler(async(req,res) =>{
    const product = await Product.findById(req.params.id);
    if(product){
        res.json(product);
    }
    res.staus(404);
    throw new Error('Product not found');
});
const createProduct = asyncHandler(async(req,res) =>{
    const product = new Product({
        name:'sample name',
        price:0,
        user:req.user._id,
        image:'/images/sample.jpg',
        brand:'sample brand',
        category:'sample category',
        countInStock:0,
        numReviews: 0,
        description: 'sample description',
    })
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async(req,res) =>{
   const {name,price,description,brand,category,image,countInStock} = req.body;
   const product = await Product.findById(req.params.id);
   if(product){
    product.name = name;
    product.price = price;
    product.brand = brand;
    product.category = category;
    product.image = image;
    product.countInStock = countInStock;
    product.description= description;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct)
   } else{
    res.stauts(404);
    throw new Error('Resource not found');
   }
});

const deleteProduct = asyncHandler(async(req,res) =>{
    const product = await Product.findById(req.params.id);
    if(product){
     await Product.deleteOne({_id: product._id});
     res.json({message: 'Product removed'});
    } else{
     res.status(404);
     throw new Error('Resource not found');
    }
 });
 
 const createProductReview = asyncHandler(async(req,res) =>{
    const {rating, comment} = req.body;
    const product = await Product.findById(req.params.id);
    if(product){
     const alreadyReviewed = product.reviews.find(
        (review) => review.user.toString() === req.user._id.toString()
     );
     if(alreadyReviewed){
        res.status(400);
        throw new Error('Product already reviewed');
     }
     const review = {
        name : req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
     }
     product.reviews.push(review);
     product.numReviews = product.reviews.length;

     product.rating = product.reviews.reduce((acc,review)=> acc+review.rating,0)/product.reviews.length;
     await product.save();
     res.status(201).json({message:'Review added'});
     }
     else{
     res.status(404);
     throw new Error('Resource not found');
    }
 });
 

export { getProducts,getProductById ,createProduct,updateProduct,deleteProduct,createProductReview};