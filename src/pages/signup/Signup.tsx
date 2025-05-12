import { useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import './SignUp.css';
import skylineImage from '../../assets/lightsenselogo.svg';

const signUpFields = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'emailid', label: 'Email ID', type: 'text', required: true },
  { name: 'password', label: 'Password', type: 'password', required: true, showToggle: true },
  {
    name: 'confirmpassword',
    label: 'Confirm Password',
    type: 'password',
    required: true,
    showToggle: true,
  },
];

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    emailid: '',
    password: '',
    confirmpassword: '',
  });

  const [errors, setErrors] = useState({});
  const [language, setLanguage] = useState('English');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    let valid = true;
    const tempErrors = {};

    signUpFields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        tempErrors[field.name] = `${field.label} is required`;
        valid = false;
      }
    });

    if (formData.emailid && !/^\S+@\S+\.\S+$/.test(formData.emailid)) {
      tempErrors.emailid = 'Invalid email format';
      valid = false;
    }

    if (
      formData.password &&
      formData.confirmpassword &&
      formData.password !== formData.confirmpassword
    ) {
      tempErrors.confirmpassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Submitted', formData);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden font-lato">
      <div className="signup-left flex">
        <div className="w-[90%] h-[90%] relative">
          <img src={skylineImage} alt="Lectronic Logo" width={400} height={400} />
        </div>
      </div>

      <div className="signup-right">
        <form className="signup-form-container m-[30px] mx-auto" onSubmit={handleSubmit}>
          <h2 className="signup-title">Welcome to LightSense</h2>
          <p className="signup-subtitle">Create an Account</p>

          {signUpFields.map((field) => (
            <TextField
              key={field.name}
              fullWidth
              label={field.label}
              name={field.name}
              type={field.type}
              value={formData[field.name]}
              onChange={handleChange}
              margin="normal"
              error={!!errors[field.name]}
              helperText={errors[field.name]}
            />
          ))}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            className="signup-button"
          >
            REGISTER
          </Button>

          <div className="text-center mt-4 h-[70px] text-[#6e6e70]">
            <a href="/login">
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                className="signup-register-button"
              >
                LOGIN
              </Button>
            </a>
          </div>

          <div className="signup-footer flex">
            <span className="footer-text">LS 1.0 @ 2025</span>
            <FormControl className="footer-select" size="small">
              <InputLabel id="language-label">Language</InputLabel>
              <Select
                labelId="language-label"
                id="language"
                value={language}
                label="Language"
                onChange={(e) => setLanguage(e.target.value)}
              >
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Arabic">Arabic</MenuItem>
              </Select>
            </FormControl>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
