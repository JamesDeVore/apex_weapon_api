const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GunSchema = new Schema({
  name:String,
  updated:{
    type:Date,
    default:Date.now
  },
  description:String,
  class:String,
  ammunition:String,
  attachments:[String],
  damage:{
    base:Number,
    head:Number,
    multiplier:Schema.Types.Decimal128,
    maxHeadshotRange:Number,
  },
  magazine:Number,
  reload:{
    loaded:Schema.Types.Decimal128,
    empty:Schema.Types.Decimal128
  },
  rpm:Number,
  fireModes:[String]
})
const Gun = mongoose.model('gun',GunSchema)

module.exports = Gun;