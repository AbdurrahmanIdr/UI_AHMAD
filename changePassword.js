import axios from 'axios';

export async function changePassword(username, formData, setError, setLoading) {
  setError('');
  setLoading(true);

  try {
    const response = await axios.put(
      `https://entomological-society-backend.onrender.com/auth/change_password/${username}`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      alert('Password changed successfully!');
      return { success: true };
    }
  } catch (err) {
    if (err.response) {
      const { status, data } = err.response;

      if (status === 400) {
        setError(data.message || 'Invalid input. Please check your data.');
      } else if (status === 401) {
        setError(data.message || 'Current password is incorrect.');
      } else if (status === 404) {
        setError('User not found.');
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
