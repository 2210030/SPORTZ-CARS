import React, { useState } from 'react';
import { Row, Col, Form, Input, Radio } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../redux/actions/userActions';
import AOS from 'aos';
import Spinner from '../components/Spinner';
import 'aos/dist/aos.css'; 

AOS.init();

function Login() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const [loginType, setLoginType] = useState('user');

  function onFinish(values) {
    if (
      (loginType === 'user' && values.username === 'macharlamamathareddy@gmail.com') ||
      (loginType === 'admin' && values.username !== 'macharlamamathareddy@gmail.com')
    ) {
      alert(`Invalid ${loginType} login attempt`);
    } else {
      dispatch(userLogin(values));
      console.log(values);
    }
  }

  const validateEmail = (rule, value, callback) => {
    if (!value) {
      callback('Please enter your email address');
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      callback('Please enter a valid email address');
    } else {
      callback();
    }
  };
  const handleLoginTypeChange = (e) => {
    setLoginType(e.target.value);
  };

  return (
    <div className="login">
      {loading && <Spinner />}
      <Row gutter={16} className="d-flex align-items-center">
        <Col
          lg={0 - 16}
          style={{ position: 'relative' }}
        >
          <img
            className="w-100"
            data-aos="slide-right"
            data-aos-duration="1500"
            src="https://www.hdwallpapers.in/download/black_car_in_black_background_hd_black-HD.jpg"
          />
          <h1 className="login-logo">FlashCars</h1>
        </Col>
        <Col
          lg={8}
          className="text-left p-5"
          style={{ position: 'absolute', left: 980, top: 100, maxWidth: '1200px' }}
        >
          <Form layout="vertical" className="login-form p-1" onFinish={onFinish}>
            <h2 style={{ color: 'Turquoise' }}>Login</h2>
            <hr />
            <Form.Item label="Login Type">
          <Radio.Group onChange={handleLoginTypeChange} value={loginType}>
            <Radio value="user">User</Radio>
            <Radio value="admin">Admin</Radio>
          </Radio.Group>
        </Form.Item>
            <Form.Item
              name="username"
              label="Email"
              rules={[{ required: true, validator: validateEmail }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true }]}>
              <Input type="password" />
            </Form.Item>

            <button className="btn1 mt-2">Login</button>

            <hr />

            <Link to="/reset-password">Forgot Password?</Link>
            <Link to="/register" className="ml-2">
              Click Here to Register
            </Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
