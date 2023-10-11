import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import MainLoader from '../../components/loader/Loader';

//Traveler accounts activate
const TViewD = () => {
  const [acc, setAcc] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const getData = () => {
    axios
      .get('http://localhost:44334/api/TravelerProfile?isActive=false')
      .then((response) => {
        console.log(response.data);
        const fetchedData = response.data;
        setAcc(fetchedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (itemId) => {
    let data = {
      AccStatus: true,
    };
    axios
      .put(`http://localhost:44334/api/TravelerProfile/${itemId}`, data)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Activated.',
        }).then(() => {
          navigate(`/tviewa`);
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed.',
        });
      });
  };

  if (acc === undefined || acc.length == 0) {
  }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center my-5'>
      <MainLoader show={loading} />
      <h2 style={{ color: 'white' }}>All Deactivated Accounts</h2>

      <Button className='btn btn-green' onClick={() => navigate(`/dashboard/traveller/stats-acc`)}>
        View Activated
      </Button>

      <Container>
        <Row className={`mt-5 mb-0 mb-md-2 mb-lg-5 px-5`}>
          {acc &&
            acc.map((item) => (
              <Col xl={3} lg={4} md={6} sm={12} className='mb-4'>
                <Card className='shadow p-2' key={item.id}>
                  <Card.Body>
                    <Row>
                      <Col>
                        <Row>
                          <Col>First Name</Col>
                          <Col className='col-1'>:</Col>
                          <Col>{item.firstName}</Col>
                        </Row>
                        <Row>
                          <Col>Last Name</Col>
                          <Col className='col-1'>:</Col>
                          <Col>{item.lastName}</Col>
                        </Row>
                        <Row>
                          <Col>NIC:</Col>
                          <Col className='col-1'>:</Col>
                          <Col>{item.nic}</Col>
                        </Row>
                        <Row className='pt-2'>
                          <Col>
                            <Button
                              className='text-nowrap btn-danger w-100'
                              onClick={() => handleDelete(item.nic)}
                            >
                              Actiavte Account
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </div>

    // <div
    //   style={{ marginTop: "150px" }}
    //   className="d-flex flex-column justify-content-center align-items-center"
    // >
    //   <h3>All Deactivated Accounts</h3>
    //   <br />
    //   <Button className="btn btn-green" onClick={() => navigate(`/tviewa`)}>
    //     View Activated
    //   </Button>
    //   <br />
    //   {acc &&
    //     acc.map((item) => (
    //       <Card
    //         className="shadow"
    //         style={{ height: "380px", width: "500px", marginBottom: "100px" }}
    //         key={item.id}
    //       >
    //         <Card.Body>
    //           <div
    //             className="d-flex flex-column justify-content-center align-items-center"
    //             style={{ marginTop: "5px" }}
    //           >
    //             <h5>First Name: {item.firstName}</h5>
    //             <br />
    //             <h5>Last Name: {item.lastName}</h5>
    //             <br />
    //             <h5>NIC: {item.nic}</h5>
    //             <br />
    //             <br />
    //             <Button
    //               className="btn btn-blue"
    //               onClick={() => handleDelete(item.nic)}
    //             >
    //               Actiavte Account
    //             </Button>
    //           </div>
    //         </Card.Body>
    //       </Card>
    //     ))}
    //   <div style={{ marginBottom: "600px" }}></div>
    // </div>
  );
};

export default TViewD;