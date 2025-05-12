import { useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import './ForgotPassword.css';
import skylineImage from '../../assets/lightsenselogo.svg';

const forgotPwdFields = [{ name: 'emailid', label: 'Email ID', type: 'text', required: true }];

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    emailid: '',
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

    forgotPwdFields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        tempErrors[field.name] = `${field.label} is required`;
        valid = false;
      }
    });

    if (formData.emailid && !/^\S+@\S+\.\S+$/.test(formData.emailid)) {
      tempErrors.emailid = 'Invalid email format';
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
      <div className="forgotpwd-left flex">
        <div className="w-[90%] h-[90%] relative">
          <img src={skylineImage} alt="Lectronic Logo" width={400} height={400} />
        </div>
      </div>

      <div className="forgotpwd-right flex">
        <form className="forgotpwd-form-container m-[30px] mx-auto" onSubmit={handleSubmit}>
          <h2 className="forgotpwd-title">Forgot password</h2>
          <p className="forgotpwd-subtitle">Please enter email address</p>

          {forgotPwdFields.map((field) => (
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
            className="forgotpwd-button"
          >
            Submit
          </Button>
          <div className="forgotpwd-footer flex">
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

export default ForgotPassword;
