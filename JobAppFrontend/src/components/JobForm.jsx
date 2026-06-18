import React from 'react'

function JobForm({ form, onChange, onSubmit, onReset, editId, error }) {
  return (
    <div className="glass-card form-card">
      <h2>{editId ? 'Edit Job' : 'Create Job'}</h2>
      <form onSubmit={onSubmit}>
        <label>
          Title
          <input name="title" value={form.title} onChange={onChange} />
        </label>
        <label>
          Company
          <input name="company" value={form.company} onChange={onChange} />
        </label>
        <label>
          Location
          <input name="location" value={form.location} onChange={onChange} />
        </label>
        <label>
          Type
          <input name="type" value={form.type} onChange={onChange} />
        </label>
        <label>
          Salary
          <input name="salary" value={form.salary} onChange={onChange} />
        </label>
        <label>
          Tech Stack (comma-separated)
          <input name="jobTechStack" value={form.jobTechStack} onChange={onChange} />
        </label>
        <label>
          Description
          <textarea name="description" value={form.description} onChange={onChange} />
        </label>
        <div className="form-actions">
          <button type="submit">{editId ? 'Update Job' : 'Add Job'}</button>
          <button type="button" className="secondary" onClick={onReset}>
            Clear
          </button>
        </div>
      </form>
      {error && <div className="error-box">{error}</div>}
    </div>
  )
}

export default JobForm
