import { model ,Schema} from "mongoose";


const CartSchema = new Schema(
  {
    userId: { type: String,  required: true},
    products: [
        {
          productId: {
            type: String
          },
          quantity: {
            type: Number,
            default: 1
          }
        }
      ],
    amount: { type: Number},
    address: {type: Object,  required: true},
    status: { type: String, default: "pending"}
  },
    {timestamps: true}
);


export default  model('Cart', CartSchema);