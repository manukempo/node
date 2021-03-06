const mongoose = require('mongoose');
const moment = require('moment');

const phoneSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    storage: {
      type: String,
      required: true,
      trim: true,
    },
    prices: [
      new mongoose.Schema(
        {
          startingDate: {
            type: String,
            validate: {
              validator: (date) => moment(date, 'YYYY-MM-DD', true).isValid(),
              message: 'It must follow the format: YYYY-MM-DD',
            },
            required: true,
            trim: true,
          },
          monthlyPremium: {
            type: Number,
            validate: {
              validator: /^\d+\.\d{2}$/,
              message: 'It must be a float with 2 decimal places.',
            },
            required: true,
            trim: true,
          },
          yearlyPremium: {
            type: Number,
            required: true,
            trim: true,
          },
          excess: {
            type: Number,
            validate: {
              validator: /^\d+$/,
              message: 'It must be an integer',
            },
            required: true,
            trim: true,
          },
        },
        {
          _id: false,
        }
      ),
    ],
  },
  {
    timestamps: true,
  }
);

phoneSchema.methods.toJSON = function () {
  const phone = this;
  const phoneObject = phone.toObject();

  delete phoneObject.createdAt;
  delete phoneObject.updatedAt;
  delete phoneObject.__v;

  return phoneObject;
};

const Phone = mongoose.model('Phone', phoneSchema);

module.exports = Phone;
