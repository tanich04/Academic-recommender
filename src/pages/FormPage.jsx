import { useState } from 'react';
import Form from '../components/Form';
import { saveSubmission } from '../services/db';
import { getRecommendation } from '../services/recommendation';

export default function FormPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [lastRecommendation, setLastRecommendation] = useState(null);

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    setMessage({ text: '', type: '' });
    setLastRecommendation(null);

    try {
      const recommendation = await getRecommendation(formData);

      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'generate_recommendation', {
          'event_category': 'engagement',
          'event_label': recommendation,
          'value': 1
        });
      }
      
      await saveSubmission(formData, recommendation);
      setLastRecommendation(recommendation);
      setMessage({ text: 'Successfully saved!', type: 'success' });
    } catch (error) {
      console.error(error);
      setMessage({ text: 'Something went wrong. Please try again.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const getRecoEmoji = (reco) => {
    if (reco.includes('Certification')) return '';
    if (reco === 'DBA') return '';
    if (reco === 'PhD') return '';
    if (reco.includes('Honorary')) return '';
    return '✨';
  };

  return (
    <div className="form-page-wrapper">
      <div className="form-card">
        <div className="form-header">
          <h1>Academic Pathway</h1>
          <p>Recommendation Engine</p>
        </div>
        <Form onSubmit={handleFormSubmit} isLoading={isLoading} />
        
        {lastRecommendation && (
          <div className="recommendation-badge">
            <span className="reco-emoji">{getRecoEmoji(lastRecommendation)}</span>
            <div className="reco-text">
              <small>Your recommended path</small>
              <strong>{lastRecommendation}</strong>
            </div>
          </div>
        )}
        
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}