import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { LoginCredentials } from '../service/types/auth.types';
import authStore from '../service/services/authStore.service';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>();

  const {  login } = authStore((state) => ({
    login: state.login,
  }));

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  // ✅ Regular User Login
  const onSubmit: SubmitHandler<LoginCredentials> = async (data) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await login(data);
      if (response.success) {
        navigate('/admin'); // Redirect on successful login
      } else {
        setErrorMessage(response.message || 'Invalid credentials');
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard className="bg-white my-5 mx-auto" style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <MDBCardBody className="p-5 w-100 d-flex flex-column">
              <h2 className="fw-bold mb-2 text-center">Login</h2>

              <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column align-items-center">
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="Email address"
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                />
                {errors.email && <p className="text-danger">{errors.email.message}</p>}

                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="Password"
                  type="password"
                  {...register('password', { required: 'Password is required' })}
                />
                {errors.password && <p className="text-danger">{errors.password.message}</p>}

                {errorMessage && <p className="text-danger">{errorMessage}</p>}

                <MDBBtn type="submit" size="lg" className="w-100" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </MDBBtn>
              </form>

              <hr className="my-4" />

              {/* Signup Navigation */}
              <MDBBtn className="mb-4 w-100" size="lg" onClick={() => navigate('/signup')}>
                Not registered? Register
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default LoginPage;
