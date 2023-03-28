import { Col, Row, Form, Input } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import Spinner from '../components/Spinner'
import { addCar } from '../redux/actions/carsActions'

function AddCar() {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.alertsReducer)

  function onFinish(values) {
    values.bookedTimeSlots = []
    dispatch(addCar(values))
    console.log(values)
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="end" className="mt-5">
        <Col lg={8} md={12} sm={18} xs={24}>
          <div
            style={{
              backgroundColor: 'black',
              padding: '20px',
              boxShadow: '0 2px 5px rgba(0,0,0,.1)',
            }}
          >
            <h3 style={{ color : 'Turquoise', fontWeight: 'bolder', fontSize: '26px' }}>Add New Car</h3>
            <hr />
            <Form layout='vertical' onFinish={onFinish}>
            <Form.Item name="name" label={<span className="custom-label">Car name</span>} rules={[{ required: true }]}>
              <Input className="add-car-input" />
            </Form.Item>
            <Form.Item name="image" label={<span className="custom-label">Image url</span>} rules={[{ required: true }]}>
              <Input className="add-car-input" />
            </Form.Item>
            <Form.Item name="rentPerHour" label={<span className="custom-label">Rent per hour</span>} rules={[{ required: true }]}>
              <Input className="add-car-input" />
            </Form.Item>
            <Form.Item name="capacity" label={<span className="custom-label">Capacity</span>} rules={[{ required: true }]}>
              <Input className="add-car-input" />
            </Form.Item>
            <Form.Item name="fuelType" label={<span className="custom-label">Fuel Type</span>} rules={[{ required: true }]}>
              <Input className="add-car-input" />
            </Form.Item>

              <div style={{ textAlign: 'right' }}>
                <button className='btn1'>ADD CAR</button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </DefaultLayout>
  )
}

export default AddCar;
