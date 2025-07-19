import axios from 'axios';

export const handleLogin = async ({ username, password, role }) => {
  try {
    const response = await axios.post('/api/login', {
      username,
      password,
      role
    });

    console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    return null;
  }
};

export const handleSignup = async (formData) => {
  try {
    const response = await axios.post('/api/signup', formData);

    console.log('Signup response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Signup error:', error.response?.data || error.message);
    return null;
  }
};
