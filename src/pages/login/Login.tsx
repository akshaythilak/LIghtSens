import { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import './login.css';
import LightSenseLogo from '../../assets/lightsenselogo.svg';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '', captcha: '' });
  const [errors, setErrors] = useState({ username: '', password: '', captcha: '' });
  const [language, setLanguage] = useState('English');
  const navigate = useNavigate();

  useEffect(() => {
    loadCaptchaEnginge(6); // load 6 character captcha
  }, []);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newErrors = { username: '', password: '', captcha: '' };
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (!formData.captcha.trim()) {
      newErrors.captcha = 'Captcha is required';
    } else if (!validateCaptcha(formData.captcha)) {
      newErrors.captcha = 'Captcha is incorrect';
    }
    if (formData.password !== 'admin') newErrors.password = 'Password is wrong';
    if (formData.username !== 'admin') newErrors.username = 'Username is wrong';

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      // console.log(formData);
      sessionStorage.setItem('username', formData.username);
      sessionStorage.setItem('password', formData.password);
      navigate('/');
    }
  };

  const handleCaptchaRefresh = () => {
    loadCaptchaEnginge(6);
    setFormData({ ...formData, captcha: '' });
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden font-lato">
      {/* Left Section */}
      <div className="login-left flex">
        <div className="w-[90%] h-[90%] relative">
          <img src={LightSenseLogo} alt="Light Sense Logo" width={400} height={400} />
        </div>
      </div>

      {/* Right Section */}
      <div className="login-right flex">
        <form className="login-form-container m-[30px] mx-auto" onSubmit={handleSubmit}>
          <h2 className="login-title">Welcome to LightSense</h2>
          <p className="login-subtitle">We make smart lighting easy</p>

          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <div className="login-remember-forgot flex">
            <FormControlLabel
              control={<Checkbox className="login-checkbox-input flex" />}
              label="Remember me"
            />
            <a href="/forgotpassword" className="login-forgot">
              Forgot Password?
            </a>
          </div>

          {/* Captcha */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <LoadCanvasTemplate />
            <IconButton title="Refresh Captcha" onClick={handleCaptchaRefresh}>
              <RefreshIcon />
            </IconButton>
            <TextField
              fullWidth
              label="Enter Captcha"
              name="captcha"
              value={formData.captcha}
              onChange={handleChange}
              error={!!errors.captcha}
              helperText={errors.captcha}
              margin="normal"
            />
          </div>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            className="login-button"
          >
            LOGIN
          </Button>

          <div className="text-center mt-4 h-[70px] text-[#6e6e70]">
            <a href="/signup">
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                className="login-register-button"
              >
                REGISTER
              </Button>
            </a>
          </div>

          <div className="login-footer flex">
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
}
