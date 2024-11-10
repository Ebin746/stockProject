import mongoose, { Model } from "mongoose";

interface Iproduct extends Document{
productName:string,
category:string,
quantity:number,
price :number
}
const ProductSchema=new mongoose.Schema({

    productName: {
        type: String,
        required: true,
        trim: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 0,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      category: {
        type: String,
        required: true,
       
      }


})

const Product:Model<Iproduct>=mongoose.models.Product||mongoose.model<Iproduct>('Product',ProductSchema);
export default Product;