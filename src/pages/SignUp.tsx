import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBInput, MDBIcon } from 'mdb-react-ui-kit';
import authStore from '../service/services/authStore.service';

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch, trigger } = useForm<FormValues>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const signup = authStore((state) => state.signup);

  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (name === 'password') trigger('confirmPassword');
    });
    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    setErrorMessage('');

    try {
      const { name, email, password } = data; // Exclude confirmPassword before sending request
      const response = await signup({ name, email, password });

      if (response.success) {
        navigate('/login');
      } else {
        setErrorMessage(response.message || 'Unexpected error occurred. Please try again.');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'An error occurred while signing up.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDBContainer fluid>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

              {errorMessage && <p className="text-danger">{errorMessage}</p>}

              <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column align-items-center">
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="user me-3" size='lg' />
                  <MDBInput
                    label='Your Name'
                    id='form1'
                    type='text'
                    className='w-100'
                    {...register("name", { required: "Name is required" })}
                  />
                </div>
                {errors.name && <p className="text-danger">{errors.name.message}</p>}

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size='lg' />
                  <MDBInput
                    label='Your Email'
                    id='form2'
                    type='email'
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email address"
                      }
                    })}
                  />
                </div>
                {errors.email && <p className="text-danger">{errors.email.message}</p>}

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size='lg' />
                  <MDBInput
                    label='Password'
                    id='form3'
                    type='password'
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                      }
                    })}
                  />
                </div>
                {errors.password && <p className="text-danger">{errors.password.message}</p>}

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="key me-3" size='lg' />
                  <MDBInput
                    label='Repeat your password'
                    id='form4'
                    type='password'
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) => value === watch('password') || "Passwords do not match"
                    })}
                  />
                </div>
                {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}

                <MDBBtn type="submit" className='mb-4' size='lg' disabled={loading}>
                  {loading ? <span>Loading...</span> : 'Register'}
                </MDBBtn>

                <div className="text-center">
                  <p>Already Registered? <Link to="/login">Login</Link></p>
                </div>
              </form>
            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default SignUp;
