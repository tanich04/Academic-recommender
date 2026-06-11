import { useState, useEffect } from 'react';
import SubmissionsList from '../components/SubmissionsList';
import { fetchAllSubmissions } from '../services/db';

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchAllSubmissions();
      setSubmissions(data);
    } catch (err) {
      console.error('Failed to load submissions:', err);
      setError(err.message || 'Unable to fetch submissions');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <SubmissionsList submissions={submissions} isLoading={isLoading} error={error} />
    </div>
  );
}