import axios from 'axios';

export async function editProfile(username, formData, setError, setLoading) {
  setError('');
  setLoading(true);

  try {
    const response = await axios.put(
      `https://your-api-url.com/auth/edit_profile/${username}/`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      alert('Profile updated successfully!');
      return { success: true, data: response.data };
    }
  } catch (err) {
    if (err.response) {
      const { status, data } = err.response;

      if (status === 404) {
        setError('User not found.');
      } else if (status === 409) {
        setError(data.message || 'A user with this data already exists.');
      } else if (status === 422) {
        setError('Validation errors occurred. Check your input.');
        console.error('Validation errors:', data.errors);
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
