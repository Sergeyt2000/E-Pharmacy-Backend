import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      match: [/^\+?[1-9]\d{1,14}$/, 'Please provide a correct phone number'],
      // default: null,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    // favoritesRecipes: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'recipes',
    //   },
    // ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UserCollection = model('user', userSchema);
