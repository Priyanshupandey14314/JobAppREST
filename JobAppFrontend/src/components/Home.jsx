import React from 'react'

function Home({ jobs, loading, error, refresh }) {
  return (
    <div className="home-shell">
      <div className="home-header-card">
        <div>
          <h2>Job Listings</h2>
          <p>
            Browse all jobs in a modern glassy data view.
            Use the navbar to manage and create postings.
          </p>
        </div>

        <button onClick={refresh}>
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="loading">
          Loading jobs...
        </div>
      ) : error ? (
        <div className="error-box">
          {error}
        </div>
      ) : (
        <div className="home-grid">
          {jobs.map((job, index) => {
            const jobKey =
              job.id ??
              `${job.title}-${job.company}-${job.location}-${index}`

            return (
              <article
                key={jobKey}
                className="glass-card job-card-dark"
              >
                <div className="job-meta">
                  <div>
                    <h3>{job.title}</h3>
                    <p className="company-name">
                      {job.company}
                    </p>
                  </div>

                  <span className="job-badge">
                    {job.type}
                  </span>
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
                      {job.jobTechStack.map(
                        (tech, techIndex) => (
                          <span
                            key={`${tech}-${techIndex}`}
                            className="tech-tag glass-tag"
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                )}
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Home