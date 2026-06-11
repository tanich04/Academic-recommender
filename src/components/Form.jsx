import { useState } from 'react';

export default function Form({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    highestQualification: 'Bachelor',
    yearsExperience: 0,
    currentProfession: '',
    careerGoal: '',
  });
  const [errors, setErrors] = useState({});

  const qualificationOptions = ['High School', 'Bachelor', 'Master', 'PhD', 'Other'];

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let newValue = value;
    if (type === 'number') {
      let num = parseInt(value, 10);
      if (isNaN(num)) num = 0;
      newValue = num;
    }
    setFormData(prev => ({
      ...prev,
      [name]: newValue,
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name required';
    if (!formData.email.trim()) newErrors.email = 'Email required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.currentProfession.trim()) newErrors.currentProfession = 'Profession required';
    if (!formData.careerGoal.trim()) newErrors.careerGoal = 'Career goal required';
    if (formData.yearsExperience < 0) newErrors.yearsExperience = 'Cannot be negative';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label>Full Name <span className="asterisk">*</span></label>
        <input
          type="text"
          name="fullName"
          placeholder="John Doe"
          value={formData.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <span className="error">{errors.fullName}</span>}
      </div>

      <div className="input-group">
        <label>Email <span className="asterisk">*</span></label>
        <input
          type="email"
          name="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="input-group">
        <label>Highest Qualification</label>
        <select name="highestQualification" value={formData.highestQualification} onChange={handleChange}>
          {qualificationOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>

      <div className="input-group">
        <label>Years of Work Experience</label>
        <input
          type="number"
          name="yearsExperience"
          placeholder="0"
          value={formData.yearsExperience}
          onChange={handleChange}
          min="0"
          step="1"
        />
        {errors.yearsExperience && <span className="error">{errors.yearsExperience}</span>}
      </div>

      <div className="input-group">
        <label>Current Profession <span className="asterisk">*</span></label>
        <input
          type="text"
          name="currentProfession"
          placeholder="e.g., Software Engineer, Teacher"
          value={formData.currentProfession}
          onChange={handleChange}
        />
        {errors.currentProfession && <span className="error">{errors.currentProfession}</span>}
      </div>

      <div className="input-group">
        <label>Career Goal <span className="asterisk">*</span></label>
        <textarea
          name="careerGoal"
          placeholder="Describe your career aspirations..."
          rows="3"
          value={formData.careerGoal}
          onChange={handleChange}
        />
        {errors.careerGoal && <span className="error">{errors.careerGoal}</span>}
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Analyzing...' : 'Get Recommendation →'}
      </button>
    </form>
  );
}