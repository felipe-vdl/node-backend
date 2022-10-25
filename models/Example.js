import mongoose from 'mongoose';

const exampleSchema = new mongoose.Schema({
  str: {
    type: String,
  },
  num: {
    type: Number,
  },
  arr: {
    type: Array,
  },
  obj: {
    type: Object,
  },
  bool: {
    type: Boolean,
  }
});

const Example = mongoose.model('Example', exampleSchema);

export { Example };