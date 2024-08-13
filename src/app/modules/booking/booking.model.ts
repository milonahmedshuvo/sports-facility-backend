import { Schema, model } from 'mongoose';

const BookingSchema = new Schema({
  
  date: {
    type: String,
    required: true,
    validate: {
      validator: function(value: string) {
        // Regex for YYYY-MM-DD format
        return /^\d{4}-\d{2}-\d{2}$/.test(value);
      },
      message: 'Date must be in YYYY-MM-DD format'
    }
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  user: {
     type: Schema.Types.ObjectId,
     ref: 'User',
     unique: true,
     required: true,
  },
  facility: {
    type: Schema.Types.ObjectId,
    ref: 'Facility',
    unique: true,
    required: true,
  },
  payableAmount: {
    type: Number,
    required: true,
  },
  isBooked: {
    type: String,
    default:'confirmed' 
  }
});


export const Booking = model('Booking', BookingSchema);