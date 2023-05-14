import React from 'react'
import { Row, Col } from "react-bootstrap";

const UserCounter = ({userOneCount, userOneImg, userOneType, userTwoCount, userTwoImg, userTwoType, userThreeCount, userThreeImg, userThreeType}) => {
  return (
        <Row className="instruction-box" style={{padding: '30px', borderRadius: "15px", margin: 0}}>
           <Col className="d-flex align-items-center justify-content-center flex-column">
             <Row className="mt-3 d-flex justify-content-center align-items-center">
               <Col xs={2}>
                 <span className="profileCentering profileText hompepageUserCountTxt">{userOneCount}</span>
               </Col>
               <Col>
                 <img src={userOneImg} alt="React Image" height={60} width={60} />
               </Col>
             </Row>
             <Row>
               <span className="mt-2 profileCentering profileText">{userOneType}</span>
             </Row>
           </Col>
           
           <Col className="d-flex align-items-center justify-content-center flex-column">
             <Row className="mt-3 d-flex justify-content-center align-items-center">
               <Col xs={2}>
                 <span className="profileCentering profileText hompepageUserCountTxt">{userTwoCount}</span>
               </Col>
               <Col>
                 <img src={userTwoImg} alt="React Image" height={60} width={60} />
               </Col>
             </Row>
             <Row>
               <span className="mt-2 profileCentering profileText">{userTwoType}</span>
             </Row>
           </Col>

           <Col className="d-flex align-items-center justify-content-center flex-column">
             <Row className="mt-3 d-flex justify-content-center align-items-center">
               <Col xs={2}>
                 <span className="profileCentering profileText hompepageUserCountTxt">{userThreeCount}</span>
               </Col>
               <Col>
                 <img src={userThreeImg} alt="React Image" height={60} width={60} />
               </Col>
             </Row>
             <Row>
               <span className="mt-2 profileCentering profileText">{userThreeType}</span>
             </Row>
           </Col>
        </Row>
  )
}

const StudentCounter = ({userOneCount, userOneImg, userOneType}) => {
  return (
    <Row className="instruction-box" style={{padding: '30px', borderRadius: "15px", margin: 0}}>
      <Col className="justify-content-start">
        <span className="profileText" style={{fontWeight: 'bold', color: '#4c4c4c', marginLeft: '-10%'}}>Supervision</span>
      </Col>
      <Col className="d-flex align-items-center justify-content-center flex-column profileText" style={{marginTop: '-8%'}}>
        Currently, I am supervising:
      </Col>
      <Col className="d-flex align-items-center justify-content-center flex-column">
        <Row className="mt-3 d-flex justify-content-center align-items-center">
          <Col xs={2}>
            <span className="profileCentering profileText hompepageUserCountTxt">{userOneCount}</span>
          </Col>
          <Col>
            <img src={userOneImg} alt="React Image" height={60} width={60} />
          </Col>
        </Row>
        <Row>
          <span className="mt-2 profileCentering profileText">{userOneType}</span>
        </Row>
      </Col>
    </Row>
  )
}

export { UserCounter, StudentCounter }
