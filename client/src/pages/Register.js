import React from "react";
import { Row, Col, Form, Input } from "antd";
import { Link } from "react-router-dom";
import {useDispatch , useSelector} from 'react-redux'
import { userRegister } from "../redux/actions/userActions";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init()
function Register() {
  const dispatch = useDispatch()
  const {loading} = useSelector(state=>state.alertsReducer)
    function onFinish(values) {
           dispatch(userRegister(values))
           console.log(values)
    }

  return (
    <div className="login">
      <Row gutter={16} className="d-flex align-items-center">
        <Col lg={0-16} style={{ position: "relative" }}>
          <img 
           className='w-100'
           data-aos='slide-left'
           data-aos-duration='1500'
          src="https://www.hdwallpapers.in/download/mclaren_720s_car_4k_5k_hd_cars-HD.jpg" />
          <h1 className="login-logo">sportZcars</h1>
        </Col>
        <Col lg={8} className="text-left p-5" style = {{position: 'absolute', left:0, top :0, maxWidth: '1200px'}}>
          <Form layout="vertical" className="login-form p-5" onFinish={onFinish}>
            <h1>Register</h1>
            <hr />
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              
              <Input />
            </Form.Item>
            <Form.Item
              name="cpassword"
              label="Confirm Password"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <button className="btn1 mt-2 mb-3">Register</button>
            <br />

            <Link to="/login">Click Here to Login</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
