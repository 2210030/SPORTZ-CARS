import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCars } from '../redux/actions/carsActions';
import DefaultLayout from '../components/DefaultLayout';
import { Col, Row, Divider, DatePicker, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import moment from 'moment';
import { Input, Button, List, Modal } from 'antd';
import Typist from 'react-typist';


const { RangePicker } = DatePicker;

function Home() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [selectedRange, setSelectedRange] = useState([]);
  const [availableCars, setAvailableCars] = useState([]);
  const [showNewsletter, setShowNewsletter] = useState(true);
  const [searchClicked, setSearchClicked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [brandFilter, setBrandFilter] = useState('');
  const [capacityFilter, setCapacityFilter] = useState('');
  const [sortBy, setSortBy] = useState('');

  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  useEffect(() => {
    if (selectedRange.length > 0 && searchClicked) {
      let filteredCars = cars.filter((car) => {
        setShowNewsletter(false);
        // Filter by brand
        if (brandFilter && car.brand !== brandFilter) {
          return false;
        }
        // Filter by capacity
        if (capacityFilter && car.capacity !== parseInt(capacityFilter)) {
          return false;
        }
        // Check availability based on the selected date range
        return car.bookedTimeSlots.every((slot) => (
          !moment(selectedRange[0]).isBetween(slot.from, slot.to) &&
          !moment(selectedRange[1]).isBetween(slot.from, slot.to) &&
          !moment(slot.from).isBetween(selectedRange[0], selectedRange[1]) &&
          !moment(slot.to).isBetween(selectedRange[0], selectedRange[1])
        ));
      });
  
      // Sort by cost
      if (sortBy === 'asc') {
        filteredCars.sort((a, b) => a.rentPerHour - b.rentPerHour);
      } else if (sortBy === 'desc') {
        filteredCars.sort((a, b) => b.rentPerHour - a.rentPerHour);
      }
  
      setAvailableCars(filteredCars);
      // ... rest of the code
    }
  }, [cars, selectedRange, searchClicked, brandFilter, capacityFilter, sortBy]);
  

  function handleRangeChange(range) {
    setSelectedRange(range);
  }
  function handleSearchClick() {
    setSearchClicked(true);
  }
  function handleSubscribe() {
    setSubscribed(true);
  }
  function handleFilterChange(e, filterType) {
    const value = e.target.value;
    if (filterType === 'brand') {
      setBrandFilter(value);
    } else if (filterType === 'capacity') {
      setCapacityFilter(value);
    } else if (filterType === 'sortBy') {
      setSortBy(value);
    }
  }
  
  
  return (
    <DefaultLayout >
      <div classname="home-page">
      <Row className="mt-3" justify="center" style={{ color: 'Turquoise' }}>
        <Col lg={6} sm={24} className="d-flex justify-content-left">
        <RangePicker showTime={{ format: 'HH:mm' }} format="MMM DD yyyy HH:mm" onChange={handleRangeChange} />
          <Button type="primary" onClick={handleSearchClick}>
            Search
          </Button>
        </Col>
        <Col lg={6} sm={24} className="d-flex justify-content-left">
    <select className="filter-select" onChange={(e) => handleFilterChange(e, 'capacity')}>
      <option value="">Filter by capacity</option>
      <option value="2">2</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
    <select className="filter-select" onChange={(e) => handleFilterChange(e, 'brand')}>
      <option value="">Filter by Brand</option>
      <option value="Mercedes">Mercedes</option>
      <option value="Rolls Royce">Rolls Royce</option>
      <option value="McLaren">McLaren</option>
      <option value="Bentley">Bentley</option>
      <option value="Chevrolet">Chevrolet</option>
      <option value="Porsche">Porsche</option>
      <option value="Ferrari">Ferrari</option>
      <option value="Lamborghini">Lamborghini </option>
      <option value="Bugatti">Bugatti</option>
    </select>
    <select className="filter-select" onChange={(e) => handleFilterChange(e, 'sortBy')}>
      <option value="">Sort by cost</option>
      <option value="asc">Low to High</option>
      <option value="desc">High to Low</option>
    </select>
  </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Typist>
            <h6 style={{color:"Turquoise", fontSize: "25px"}}>Welcome to FlashCars</h6>
            <Typist.Backspace count={23} delay={5000} />
            <h6 style={{color:"Turquoise", fontSize: "25px"}}>Please enter the dates above to find the available cars.</h6>
          </Typist>
        </Col>
      </Row>

      {showNewsletter && !searchClicked &&  (
        
        <Row justify="bottom">
          <Col lg={12} md={16} sm={20}>
            <div className="newsletter-container d-flex align-items-center justify-content-center flex-wrap">
              <div className="newsletter-text">
                <p style={{color:"Turquoise"}}>Subscribe to our newsletter to receive updates on new car rentals and special offers.</p>
              </div>
              <div className="newsletter-input">
                <Input placeholder="Enter your email" />
              </div>
              <div className="newsletter-button">
                <Button type="primary">Subscribe</Button>
              </div>
            </div>
          </Col>
        </Row>
        
      )}

      {loading ? (
        <Spinner />
      ) : (
        selectedRange.length > 0 && (
          <Row justify="center">
            <Col>
              <List
                dataSource={availableCars}
                renderItem={(car) => (
                  <List.Item>
                    <div className="car p-2 bs1" style={{ display: 'flex' }}>
                      <img src={car.image} className="carimg" style={{ width: '50%', marginRight: '20px' }} />

                      <div className="car-content d-flex align-items-center justify-content-between flex-grow-1">
                        <div className="text-left pl-2">
                          <p>{car.name}</p>
                          <p>Rent Per Hour {car.rentPerHour} /-</p>
                        </div>

                        <div>
                          <button className="btn1 mr-2">
                            <Link to={`/booking/${car._id}`}>Book Now</Link>
                          </button>
                        </div>
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </Col>
          </Row>
          
          
        )
      )}
      </div>
    </DefaultLayout>
  );
}

export default Home;
