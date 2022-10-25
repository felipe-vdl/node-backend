import express from 'express';
import cors from 'cors';
import methodOverride from "method-override";
import mongoose from 'mongoose';

// Models
import { Example } from './models/Example.js';

const app = express();
const port = 3005;

mongoose.connect('mongodb://127.0.0.1/exampleApp')
  .then(() => {
    console.log('Mongoose Connected');
  })
  .catch((e) => {
    console.log('Mongoose Failed');
    console.log(e);
  });

// Middlewares
app.use(express.urlencoded({ extended: true }));    // Form Body
app.use(express.json());                    // JSON data
app.use(cors()); // CORS Policy
app.use(methodOverride('_method')); // Methods

// Index
app.get('/example', async (req, res) => {
  try {
    const allExamples = await Example.find();
    res.json(allExamples);

  } catch (error) {
    console.log(error.message);
  }
});

// Store
app.post('/example', async (req, res) => {
  try {
    const { str, num, arr, obj, bool } = req.body;

    const example = new Example({
      str: str,
      num: num,
      arr: arr,
      obj: obj,
      bool: bool
    });

    await cart.save();

    res.json('Example created.');

  } catch (error) {
    res.json(error.message);
  }
});

// Show
app.get('/example/:id', async (req, res) => {
  try {
    const { id } = req.body;

    const example = await Example.findById(id);
    res.json(example);

  } catch (error) {
    res.json(error.message);
  }
});

// Update
app.patch('/example/:id', async (req, res) => {
  try {
    const { id, str, num, arr, obj, bool } = req.body;

    const example = await Example.findByIdAndUpdate(id, {
      str: str,
      num: num,
      arr: arr,
      obj: obj,
      bool: bool
    });

  } catch (error) {
    res.json(error.message);
  }
});

// Delete
app.delete('/example/:id', async (req, res) => {
  try {
    const example = await Example.findByIdAndDelete(id);
    res.json('Example deleted.')

  } catch (error) {
    res.json(error.message);
  }
});

app.listen(port, () => {
  console.log(`Listening at port ${port}.`);
});