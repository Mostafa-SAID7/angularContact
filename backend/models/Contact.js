const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [2, 'Name must be at least 2 characters'],
      trim: true,
    },
    email: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
      match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid E.164 phone number'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    // expose virtual `id` (number-compatible string) alongside `_id`
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// The Angular frontend uses numeric `id` — we expose _id as `id`
contactSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

module.exports = mongoose.model('Contact', contactSchema);
