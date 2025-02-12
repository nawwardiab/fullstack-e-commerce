import { Schema, model} from "mongoose";

const CartSchema = new Schema({
    items: [
        {
          product: { type: String },
          quantity: { type: Number, required: true, default: 1},
        },
      ],
});

export default model("Cart", CartSchema);


// product: { type: Schema.Types.ObjectId, ref: "Product" },