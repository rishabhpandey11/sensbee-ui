import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';

const AboutPage: React.FC = () => {
    return (
        <MDBContainer fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <MDBRow className="d-flex justify-content-center">
                <MDBCol col="12" md="8">
                    <MDBCard className="my-5">
                        <MDBCardBody>
                            {/* Add an image above the card content */}
                        

                            <MDBCardTitle className="text-center mb-4">
                                <h2>About Sensbee</h2>
                            </MDBCardTitle>
                            <MDBCardText>
                                Welcome to our platform! We are dedicated to providing the best user experience with cutting-edge technology.
                      
                            </MDBCardText>
                            <MDBCardText>
                                In today’s rapidly evolving urban environments, the concept of a "Smart City" has gained significant attention. A smart city is one where various digital technology, such as IoT sensors, are integrated into the city's infrastructure to improve the quality of life, optimize resource use, and provide efficient services. The backbone of any smart city is its data infrastructure, particularly the data gathered from IoT sensors placed throughout the city. This data drives decision-making processes, supports predictive analysis, and enables the development of applications that serve various societal needs. However, the management of these sensors and data can be complex and requires specialized knowledge. This report explores the design and development of a web application that simplifies the management of sensors and data in smart cities using existing REST APIs. The growing use of sensors in smart city ecosystems generates massive volumes of data, ranging from traffic patterns to environmental readings. However, managing this data effectively requires streamlined processes for sensor registration, data ingestion, and visualization. Typically, the complexity involved in sensor management requires expert knowledge and technical expertise, limiting the accessibility of these systems for non-technical users.
                                The primary motivation for this project is to overcome this barrier by developing a user-friendly web application that facilitates the registration, configuration, and management of sensors within a smart city. Additionally, the application will enable smooth data access and visualization, thus opening the door for both developers and non-technical users to interact with the sensor data seamlessly.

                            </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default AboutPage;
