import React from "react";
import { Row, Col, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../redux/actions/userActions";
import AOS from "aos";
// import { useHistory } from 'react-router-dom';
import Spinner from "../components/Spinner";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

function Register() {
  // const history = useHistory();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);

  function onFinish(values) {
    const reqObj = {
      username: values.username,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
    };
    dispatch(userRegister(reqObj));
    console.log(values);
    // history.push('/login');
  }
  

  return (
    <div className="login">
      {loading && <Spinner />}
      <Row gutter={16} className="d-flex align-items-center">
        <Col
          lg={0 - 16}
          style={{ position: "relative" }}
        >
          <img
            className="w-100"
            data-aos="slide-left"
            data-aos-duration="1500"
            src="https://www.hdwallpapers.in/download/black_car_in_black_background_hd_black-HD.jpg"
          />
          <h1 className="login-logo">FlashCars</h1>
        </Col>
        <Col
          lg={8}
          className="text-left p-5"
          style={{
            position: "absolute",
            left: 860,
            top: 80,
            maxWidth: "1200px",
          }}
        >
          <Form
            layout="vertical"
            className="login-form p-5"
            onFinish={onFinish}
          >
            <h2 style={{ color: "Turquoise" }}>Register</h2>
            <hr />
            <Form.Item
            name="firstName"
  label="First Name"
  rules={[{ required: true, message: "Please enter your first name" }]}
>
  <Input />
</Form.Item>

<Form.Item
  name="lastName"
  label="Last Name"
  rules={[{ required: true, message: "Please enter your last name" }]}
>
  <Input />
</Form.Item>
            <Form.Item
              name="username"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email address" },
                { type: "email", message: "Please enter a valid email address" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password" },
                {
                  pattern: passwordPattern,
                  message:
                    "Password must have an uppercase letter, lowercase letter, a number, and a special character",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="cpassword"
              label="Confirm Password"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
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
