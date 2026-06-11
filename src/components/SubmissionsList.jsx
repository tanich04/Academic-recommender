export default function SubmissionsList({ submissions, isLoading, error }) {
  if (isLoading) {
    return (
      <div className="submissions-container">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
          <p>Loading submissions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="submissions-container">
        <div className="message error" style={{ textAlign: 'center' }}>
          Failed to load submissions: {error}
        </div>
      </div>
    );
  }

  if (!submissions || submissions.length === 0) {
    return (
      <div className="submissions-container">
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
          No submissions yet. Be the first!
        </div>
      </div>
    );
  }

  return (
    <div className="submissions-container">
      <h2>All Submissions</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Career Goal</th>
              <th>Recommendation</th>
              <th>Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub, idx) => (
              <tr key={idx}>
                <td data-label="Full Name">{sub.full_name}</td>
                <td data-label="Email">{sub.email}</td>
                <td data-label="Career Goal">{sub.career_goal}</td>
                <td data-label="Recommendation">
                  <span style={{ 
                    background: 'var(--accent)', 
                    color: 'white', 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '0.25rem',
                    fontSize: '0.875rem',
                    display: 'inline-block'
                  }}>
                    {sub.recommendation}
                  </span>
                </td>
                <td data-label="Submitted At">
                  {new Date(sub.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}