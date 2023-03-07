const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const UserSchena = new Schema(
  {
    usermail: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    companys: {
      type: Array,
      default: [],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    postion: {
      type: String,
      default: "employer",
    },
  },
  {
    timestamps: true,
  }
);
UserSchena.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hashSync(this.password, salt);

  this.password = hash;

  return next();
});
UserSchena.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password).catch((err) => false);
};
module.exports = mongoose.model("User", UserSchena);
