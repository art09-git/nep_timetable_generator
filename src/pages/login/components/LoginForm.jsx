import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
    role: 'administrator'
  });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (formErrors?.[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData?.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      errors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const roleOptions = [
    { value: 'administrator', label: 'Administrator', icon: 'Shield' },
    { value: 'faculty', label: 'Faculty', icon: 'GraduationCap' },
    { value: 'student', label: 'Student', icon: 'User' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4 flex items-start space-x-3">
          <Icon name="AlertCircle" size={20} className="text-error mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-error font-medium">Authentication Failed</p>
            <p className="text-error/80 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}
      <div className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your institutional email"
          value={formData?.email}
          onChange={handleInputChange}
          error={formErrors?.email}
          required
          disabled={loading}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleInputChange}
          error={formErrors?.password}
          required
          disabled={loading}
        />
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Select Your Role
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {roleOptions?.map((option) => (
              <label
                key={option?.value}
                className={`relative flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-smooth ${
                  formData?.role === option?.value
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={option?.value}
                  checked={formData?.role === option?.value}
                  onChange={handleInputChange}
                  className="sr-only"
                  disabled={loading}
                />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  formData?.role === option?.value
                    ? 'border-primary bg-primary' :'border-muted-foreground'
                }`}>
                  {formData?.role === option?.value && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <Icon 
                  name={option?.icon} 
                  size={18} 
                  className={formData?.role === option?.value ? 'text-primary' : 'text-muted-foreground'} 
                />
                <span className={`text-sm font-medium ${
                  formData?.role === option?.value ? 'text-primary' : 'text-foreground'
                }`}>
                  {option?.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            checked={formData?.rememberMe}
            onChange={handleInputChange}
            name="rememberMe"
            disabled={loading}
          />
          
          <button
            type="button"
            className="text-sm text-primary hover:text-primary/80 transition-smooth"
            disabled={loading}
          >
            Forgot Password?
          </button>
        </div>
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={loading}
        iconName="LogIn"
        iconPosition="right"
      >
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;