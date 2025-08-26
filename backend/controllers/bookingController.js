import Booking from "../models/Booking.js";

// create new booking
export const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);
  try {
    const savedBooking = await newBooking.save();
    res
      .status(200)
      .json({
        seccess: true,
        message: "Your tour is booked",
        data: savedBooking
      });
  } catch (err) {
    res
      .status(500)
      .json({
        seccess: true,
        message: "internal server error",
      });
  }
};

// get single booking
export const getBooking = async (req,res) => {
    const id = req.params.id

    try {
        const book = await Booking.findById(id)

        res
        .status(200)
        .json({
          seccess: true,
          message: "successful",
          data: book
        });

    }catch (err) {
        res
      .status(404)
      .json({
        seccess: true,
        message: "not found",
      });
    }
}
// get all booking
export const getAllBooking = async (req,res) => {

    try {
        const books = await Booking.find();

        res
        .status(200)
        .json({
          seccess: true,
          message: "successful",
          data: books
        });

    }catch (err) {
        res
      .status(500)
      .json({
        seccess: true,
        message: "internal server error",
      });
    }
}






// import Stripe from "stripe";
// import Booking from "../models/Booking.js";

// // Create a new Stripe instance
// const stripe = new Stripe("YOUR_STRIPE_SECRET_KEY");

// // Create a new booking
// export const createBooking = async (req, res) => {
//   const newBooking = new Booking(req.body);
//   try {
//     // Create a new Stripe payment intent
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: newBooking.price * 100, // Convert price to cents
//       currency: "usd",
//       payment_method_types: ["card"],
//     });

//     // Save the payment intent ID to the booking document
//     newBooking.paymentIntentId = paymentIntent.id;

//     // Save the booking to the database
//     const savedBooking = await newBooking.save();

//     // Return the payment intent client secret to the client
//     res.status(200).json({
//       success: true,
//       message: "Your tour is booked",
//       data: savedBooking,
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// // Get single booking
// export const getBooking = async (req, res) => {
//   const id = req.params.id;

//   try {
//     const book = await Booking.findById(id);

//     // Retrieve the payment intent from Stripe
//     const paymentIntent = await stripe.paymentIntents.retrieve(book.paymentIntentId);

//     res.status(200).json({
//       success: true,
//       message: "Successful",
//       data: book,
//       paymentIntent: paymentIntent,
//     });
//   } catch (err) {
//     res.status(404).json({
//       success: false,
//       message: "Not found",
//     });
//   }
// };

// // Get all bookings
// export const getAllBooking = async (req, res) => {
//   try {
//     const books = await Booking.find();

//     // Retrieve the payment intents from Stripe
//     const paymentIntents = await Promise.all(
//       books.map((book) => stripe.paymentIntents.retrieve(book.paymentIntentId))
//     );

//     res.status(200).json({
//       success: true,
//       message: "Successful",
//       data: books,
//       paymentIntents: paymentIntents,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// // Update booking status
// export const updateBookingStatus = async (req, res) => {
//   const id = req.params.id;
//   const status = req.body.status;

//   try {
//     const book = await Booking.findById(id);

//     // Update the payment intent status on Stripe
//     const paymentIntent = await stripe.paymentIntents.update(book.paymentIntentId, {
//       status: status,
//     });

//     // Update the booking status in the database
//     book.status = status;
//     await book.save();

//     res.status(200).json({
//       success: true,
//       message: "Booking status updated",
//       data: book,
//       paymentIntent: paymentIntent,
//     });
//   } catch (err) {
//     res.status(404).json({
//       success: false,
//       message: "Not found",
//     });
//   }
// };





