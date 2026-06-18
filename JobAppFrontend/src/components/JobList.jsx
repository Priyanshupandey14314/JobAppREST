import React from 'react'

function JobList({ jobs, onEdit, onDelete, loading }) {
  if (loading) {
    return <div className="loading">Loading jobs...</div>
  }

  if (!jobs.length) {
    return <div className="empty-state">No jobs found.</div>
  }

  return (
    <div className="job-list">
      {jobs.map((job, index) => {
        const jobKey =
          job.id ?? `${job.title}-${job.company}-${job.location}-${index}`

        return (
          <article key={jobKey} className="glass-card job-card">
            <div className="job-meta">
              <div>
                <h3>{job.title}</h3>
                <p className="company-name">{job.company}</p>
              </div>

              <div className="job-badge">
                {job.type}
              </div>
            </div>

            <p className="job-description">
              {job.description}
            </p>

            <div className="job-details">
              <span>{job.location}</span>
              <span>{job.salary}</span>
            </div>

            {Array.isArray(job.jobTechStack) &&
              job.jobTechStack.length > 0 && (
                <div className="job-tags">
                  {job.jobTechStack.map((tech, techIndex) => (
                    <span
                      key={`${tech}-${techIndex}`}
                      className="tech-tag"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
            )}

            <div className="job-actions">
              <button
                className="secondary"
                onClick={() => onEdit(job)}
              >
                Edit
              </button>

              <button
                className="danger"
                onClick={() => onDelete(job.id)}
              >
                Delete
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default JobList