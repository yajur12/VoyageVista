import React, { useState, useContext } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour;
  const navigate = useNavigate();

  const {user} = useContext(AuthContext)

  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  });

// handleChange: updates the booking state when the user inputs data into the form fields
// handleClick: handles the form submission, sends a POST request to the server to book the tour, and navigates to a "thank you" page upon success

  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 10;
  const totalAmount = Number(price) * Number(booking.guestSize) + Number (serviceFee);

  //   send data to the server
  const handleClick = async (e) => {
    e.preventDefault();

    console.log(booking);

      try{
        if(!user || user === undefined || user === null){
          return alert('Please sign in')
        }

        const res = await fetch(`${BASE_URL}/booking`,{ // this is the API that handles booking requests
          method:'post', // HTTP method
          headers:{
            'content-type':'application/json'
          },
          credentials:'include', // eg cookies in requests  
          body:JSON.stringify(booking) // serializes the booking object to JSON and sends it as the request body
        })
        const result = await res.json()

        if(!res.ok){
          return alert(result.message)
        }
        navigate("/thank-you");

      }catch (err) {
        alert(err.message)
      }
    };

  return (
    <div className="booking">
      <div className="booking_top d-flex align-items-center justify-content-between">
        <h3>
          ${price} <span>/per person</span>            { /*tour price*/ }
        </h3>
        <span className="tour_rating d-flex align-items-center">
          <i className="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* ===== booking form start =====  */}
      <div className="booking_form">
        <h5>Information</h5>
        <Form className="booking_info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full name"
              id="fullName"
              required
              onChange={handleChange}   // specifies the handleChange event handler to update the booking state
              
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>
      {/* ===== booking form end =====  */}

      {/* ===== booking bottom ===== */}

{/* The bottom section is wrapped in a div element with the class booking_bottom. It contains:
A ListGroup element with three ListGroupItem elements, each displaying a different piece of information:
The tour price with a "1 person" suffix
The service charge
The total amount to be paid
A Button element with the class primary_btn and an onClick event handler set to handleClick. The button text is "Book Now". */}
      <div className="booking_bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ${price} <i class="ri-close-line"></i> 1 person
            </h5>
            <span>${price}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>
        <Button className="btn primary_btn w-100 mt-4 book_btn" onClick={handleClick}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default Booking;
