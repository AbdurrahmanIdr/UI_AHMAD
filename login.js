import axios from 'axios';

export async function loginUser(formData, setError, setLoading) {
  setError('');
  setLoading(true);

  try {
    const response = await axios.post(
      'https://your-api-url.com/auth/login',
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      alert('Login successful!');
      return { success: true, data: response.data };
    }
  } catch (err) {
    if (err.response) {
      const { status, data } = err.response;

      if (status === 401) {
        setError(data.message || 'Invalid email or password.');
      } else {
        setError(data.message || 'An unexpected error occurred.');
      }
    } else {
      setError('Network error. Please try again.');
    }
    return { success: false };
  } finally {
    setLoading(false);
  }
}
