import { Schema,model } from "mongoose"


const OrderSchema = new Schema({
  userId: { type: String, required: true},
  products: [
    {
      productId: {type: String},
      quantity: { type: Number, default: 1}
    }
  ],
  amout: {type: Number, required: true},
  address: { type: Object, required: true },
  sttatus: {type: String, default: "pending"}
}, {timestamps: true})

export default model('Order', OrderSchema);