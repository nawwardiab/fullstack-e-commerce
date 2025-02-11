import { Schema, model} from "mongoose";

const CartSchema = new Schema({
    items: [
        {
          product: { type: Schema.Types.ObjectId, ref: "Product" },
          quantity: { type: Number, required: true, default: 1},
        },
      ],
});

export default model("Cart", CartSchema);