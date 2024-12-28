import axios from 'axios';

export async function registerUser(formData, setError, setLoading) {
  setError(''); // Clear any previous errors
  setLoading(true); // Show loading state

  try {
    const response = await axios.post('https://your-api-url.com/auth/register', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Handle success
    if (response.status === 201) {
      alert('Registration Successful!');
      return { success: true, data: response.data };
    }
  } catch (err) {
    // Handle errors
    if (err.response) {
      const { status, data } = err.response;

      if (status === 409) {
        setError(data.message || 'User already exists!');
      } else if (status === 422) {
        setError('Validation errors occurred. Check your input.');
        console.error('Validation errors:', data.errors); // Log detailed errors
      } else {
        setError(data.message || 'An unexpected error occurred.');
      }
    } else {
      setError('Network error. Please try again.');
    }
    return { success: false };
  } finally {
    setLoading(false); // Hide loading state
  }
}

const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent form refresh

  const formData = {
    username: e.target.username.value,
    email: e.target.email.value,
    surname: e.target.surname.value,
    first_name: e.target.first_name.value,
    other_names: e.target.other_names.value,
    research_interest: e.target.research_interest.value,
    education: e.target.education.value,
    branch: e.target.branch.value,
    membership_plan: e.target.membership_plan.value,
    password: e.target.password.value,
  };

  const result = await registerUser(formData, setError, setLoading);

  if (result.success) {
    alert('User registered successfully!');
    console.log(result.data); // Handle response data (e.g., token or details)
  }
};


