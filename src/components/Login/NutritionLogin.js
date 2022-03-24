import React from 'react'
import {Button,
        Card,
        Container,
        Row,
        Col,
        Image} from 'react-bootstrap';
import HISDNutritionServicesLogo from '../../images/HISDNutritionServicesLogo.png';
import SchoolYearDropDown from '../ReusableAppComponents/SchoolYearDropDown';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function NutritionLogin() {

  const location = useLocation();

    useEffect(() => {
       console.log(location.pathname); // result: '/secondpage'
       console.log(location.search); // result: '?query=abc'
       var arrParams = location.search.split("=")
       console.log(arrParams[1])
    }, [location]);


  return (
    <div className='SampleReactBootStapWebPage'>
    <main>
        <Container>
          <Row className='px-4 my-5'>
            <Col sm={12}>
              <Image
                src={HISDNutritionServicesLogo}
                fluid
              />
            </Col>
          </Row>

          <Row>
            <Col sm={12}>
              <p>Nutrition Services – Special Diets Application</p>
            </Col>
          </Row>

          <Row>
            <Col sm={12}>
             
            </Col>
          </Row>
        </Container>
    </main>
     <br></br>
     <br></br>
     <br></br>
     <br></br>
     <br></br>
     <br></br>
     <br></br>
     <br></br>
     <br></br>
     <br></br>
     <br></br>
     <br></br>
     <br></br>
     <br></br>
    <footer className='py-2 my-5 bg-dark'>
     <Container className='px-1'>
      <p className='text-center text-white'>Copyright &copy; HISD -Nutrition Services 2022</p>
     </Container>
    </footer>
   </div>
  )
}

export default NutritionLogin