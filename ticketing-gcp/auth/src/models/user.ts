import mongoose from "mongoose";
import { Password } from "../services/password";

//Note: ankle brackets <> in this case are specific to TS

//An interface that describes the properties
//that are required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

//An interface that describes the properties
//that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

//An interface that describes the properties
// tha a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    //not the best approach, business/data logic is usually defined in the view portion of Data Model View design pattern
    //but for our example it will work just fine
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

//specific to mongoose; note: NOT using arrow function because
//we do not want to override the value of "this." with the context of entire file
//in this case value of "this." should be specific to a given user
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

//this part is specific to TS and Mongoose, since they do not work together really well
//in plain JS you can just call like so: const User = new User()
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
