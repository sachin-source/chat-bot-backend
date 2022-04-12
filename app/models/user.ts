import { generateRandomString } from "../config/constants.config";

var mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema : typeof mongoose.Schema = new mongoose.Schema({
    email: { type: String, unique: true },
    username: { type: String },
    password: { type: String },
    privateKey: { type: String, default: generateRandomString(), unique: true },
    role: { type: String, enum : ["admin", "superAdmin", "supportAgent"], default : "superAdmin" },
    channelId: { type: String },
},{ timestamps: true });

UserSchema.pre("save", function (this: typeof UserSchema, next: Function) {

    if (this.isModified("password") || this.isNew) {
        return bcrypt.hash(this.password, 10, (hashError: any, hash: string) => {
            if (hashError) return next(hashError);
            this.password = hash;
            return next();
        })
    } else {
        return next();
    }
})

UserSchema.statics = {
    comparePassword: (password: string, hashedPassword: string, callback: Function) => {
        return bcrypt.compare(password, hashedPassword, callback);
    }
};

module.exports = mongoose.model("user", UserSchema)