const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CompanySchema = new Schema({
  creatorId: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
    unique: true,
  },
  employers: {
    type: Array,
    default: [],
  },
  companyAddress: {
    type: String,
    required: false,
  },
  vatNumber: {
    type: Number,
    required: true,
  },
  taxRegistration: {
    type: Number,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },
  faxNumber: {
    type: String,
    required: false,
  },
  phoneNumber1: {
    type: String,
    required: false,
  },
  phoneNumber2: {
    type: String,
    required: false,
  },
  phoneNumber3: {
    type: String,
    required: false,
  },
  companyImage: {
    type: String,
    required: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
},{
  timestamps:true
});
module.exports = mongoose.model("Company", CompanySchema);
