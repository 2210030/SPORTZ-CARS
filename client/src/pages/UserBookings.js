import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../redux/actions/bookingActions";
import { Col, Row } from "antd";
import Spinner from '../components/Spinner';
import moment from "moment";
function UserBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const {loading} = useSelector((state) => state.alertsReducer);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getAllBookings());
  }, []);

  return (
    <DefaultLayout>
        {loading && (<Spinner />)}
      <h3 className="text-center mt-2" style = {{color: "#C3C7C7", fontWeight: "bolder", fontSize: "38px"}}>My Bookings</h3>
    
      <Row justify="center" gutter={16}>
        <Col lg={16} sm={24}>
          <div
            style={{
              backgroundColor: 'black',
              color: 'Turquoise!important',
              padding: '20px',
              boxShadow: '0 2px 5px rgba(0,0,0,.1)',
            }}
          >
         
            {bookings.filter(o=>o.user==user._id).map((booking) => {
             return <Row gutter={16} className="bs1 mt-3 text-left">
                <Col lg={6} sm={24}>
                    <p style={{ color: "#C3C7C7", fontSize: "15px" }}><b>{booking.car.name}</b></p>
                    <p style={{ color: "#C3C7C7" , fontSize: "15px"}}>Total hours : <b>{booking.totalHours}</b></p>
                    <p style={{ color: "#C3C7C7", fontSize: "15px" }}>Rent per hour : <b>{booking.car.rentPerHour}</b></p>
                    <p style={{ color: "#C3C7C7", fontSize: "15px" }}>Total amount : <b>{booking.totalAmount}</b></p>
                </Col>

                <Col lg={14} sm={24}>
                <p style={{ color: "#C3C7C7", fontSize: "15px" }}>Transaction Id : <b>{booking.transactionId}</b></p>
                <p style={{ color: "#C3C7C7", fontSize: "15px" }}>From: <b>{booking.bookedTimeSlots.from}</b></p>
                <p style={{ color: "#C3C7C7", fontSize: "15px" }}>To: <b>{booking.bookedTimeSlots.to}</b></p>
                <p style={{ color: "#C3C7C7", fontSize: "15px" }}>Date of booking: <b>{moment(booking.createdAt).format('MMM DD yyyy')}</b></p>
                </Col>

                <Col lg={6} sm={24} className='text-right'>
                    <img style={{borderRadius:5}} src={booking.car.image}  height="140" className="p-2"/>
                </Col>
              </Row>;
            })}
          </div>
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default UserBookings;
