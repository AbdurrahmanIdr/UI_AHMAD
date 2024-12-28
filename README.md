Here's the simplified script that **collects form data** and **makes the request** without including UI design elements:  

### **Code: Register User with API Request**  
```javascript
import axios from 'axios';

export async function registerUser(formData, setError, setLoading) {
  setError(''); // Clear any previous errors
  setLoading(true); // Show loading state

  try {
    const response = await axios.post('https://entomological-society-backend.onrender.com/auth/register', formData, {
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
```

---

### **Usage in Your Form:**
```javascript
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
```

---

### **How It Works:**
1. **Collect Data**:  
   - Gets form values directly from `e.target.<input_name>.value`.  

2. **Call API**:  
   - Sends the collected data in a POST request.  

3. **Handle Response**:  
   - **201 Created** → Shows success message.  
   - **409 Conflict** → Displays error about duplicate entries.  
   - **422 Validation Error** → Displays validation messages.  
   - **500 Server Error/Network Issues** → Handles unexpected issues.  

---

### **Key Features:**
- Flexible: No UI is hardcoded—works with your existing form.  
- Error Handling: Manages network, validation, and conflict errors.  
- Modular: Can be reused in multiple forms.  

Let me know if you need any further adjustments!

Here are the scripts to handle **Edit Profile**, **Change Password**, and **Login** API requests using JavaScript without UI elements:  

---

## **1. Edit Profile Request**  
```javascript
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
```

---

## **2. Change Password Request**  
```javascript
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
```

---

## **3. Login Request**  
```javascript
import axios from 'axios';

export async function loginUser(formData, setError, setLoading) {
  setError('');
  setLoading(true);

  try {
    const response = await axios.post(
      'https://entomological-society-backend.onrender.com/auth/login',
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
```

---

## **Usage Examples:**

### **Edit Profile**
```javascript
const handleEditProfile = async (e) => {
  e.preventDefault();
  const formData = {
    email: e.target.email.value,
    first_name: e.target.first_name.value,
    surname: e.target.surname.value,
    research_interest: e.target.research_interest.value,
  };

  const result = await editProfile('username123', formData, setError, setLoading);

  if (result.success) {
    console.log(result.data);
  }
};
```

---

### **Change Password**
```javascript
const handleChangePassword = async (e) => {
  e.preventDefault();
  const formData = {
    current_password: e.target.current_password.value,
    new_password: e.target.new_password.value,
    confirm_password: e.target.confirm_password.value,
  };

  const result = await changePassword('username123', formData, setError, setLoading);

  if (result.success) {
    console.log('Password changed successfully!');
  }
};
```

---

### **Login**
```javascript
const handleLogin = async (e) => {
  e.preventDefault();
  const formData = {
    email: e.target.email.value,
    password: e.target.password.value,
  };

  const result = await loginUser(formData, setError, setLoading);

  if (result.success) {
    console.log(result.data);
  }
};
```

---

### **Key Features in Code:**
1. **Reusable Functions**:  
   Each function can be called with just the required data, making them reusable across different forms.  

2. **Error Handling**:  
   Handles all error scenarios based on HTTP response codes (404, 409, 422, etc.).  

3. **Loading and Error States**:  
   Provides feedback to users while API requests are in progress.  

4. **Dynamic Inputs**:  
   Collects form data dynamically without tying it to specific UI elements.  

Let me know if more refinements are needed!