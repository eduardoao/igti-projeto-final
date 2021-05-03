const mongoose = require('mongoose');

let schema = mongoose.Schema({
  description: { type: String, required: true},
  value: {type: Number, require: true},
  category: { type: String, required: true},
  year: {type: Number, require: true},
  month: {type: Number, require: true},
  day: {type: Number, require: true},
  yearMonth: { type: String, required: true},
  yearMonthDay: { type: String, required: true},
  type: { type: String, required: true},
});

const TransactionModel = mongoose.model('transaction', schema);

module.exports = TransactionModel;
