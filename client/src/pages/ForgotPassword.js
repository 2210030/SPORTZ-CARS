import React from 'react';
import { Form, Input, Button } from 'antd';

function ForgotPassword() {
  const onFinish = (values) => {
    console.log('Submit values:', values);
    // Send reset password email API call here
  };

  return (
    <div style={{backgroundColor: "Black"}}>
      <h1>Forgot Password</h1>
      <Form onFinish={onFinish}>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: 'email',
              message: 'Please enter a valid email!',
            },
            {
              required: true,
              message: 'Please enter your email!',
            },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ForgotPassword;
