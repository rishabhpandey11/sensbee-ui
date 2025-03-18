import React from 'react'
import { MDBFooter } from 'mdb-react-ui-kit';

const Footer = () => {
  return (
    <div>
        <footer>
                {/* Footer Section */}
                <MDBFooter  style={{ backgroundColor: '#09122C', color: 'white' }} className="text-center text-lg-left">
                    <div
                        className="text-center p-3"
                       
                    >
                        &copy; {new Date().getFullYear()} Copyright:{' '}
                        <h3  >
                        Sensbee
                          </h3>
                    </div>
                </MDBFooter>
            </footer>
    </div>
  )
}

export default Footer
