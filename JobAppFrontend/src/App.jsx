import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import JobList from './components/JobList'
import JobForm from './components/JobForm'
import Home from './components/Home'

const API_URL = 'http://localhost:8080/jobPosts'

function AppRoutes() {
  const [jobs, setJobs] = useState([])
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    salary: '',
    description: '',
    jobTechStack: ''
  })
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const normalizeJob = (raw) => ({
    id: raw.id ?? raw.pid ?? `${raw.postProfile ?? raw.title ?? 'job'}-${raw.company ?? 'unknown'}-${raw.location ?? 'unknown'}`,
    title: raw.title ?? raw.postProfile ?? 'Untitled Job',
    company: raw.company ?? raw.postCompany ?? 'Unknown Company',
    location: raw.location ?? raw.postLocation ?? 'Unknown Location',
    type: raw.type ?? raw.jobType ?? raw.postType ?? 'Unknown',
    salary: raw.salary ?? raw.compensation ?? raw.pay ?? 'Not specified',
    description: raw.description ?? raw.postDesc ?? '',
    jobTechStack: raw.jobTechStack ?? raw.postTechStack ?? []
  })

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('Failed to fetch jobs')
      const data = await response.json()
      const jobsArray = Array.isArray(data) ? data : data.value ?? []
      setJobs(jobsArray.map(normalizeJob))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setForm({
      title: '',
      company: '',
      location: '',
      type: '',
      salary: '',
      description: '',
      jobTechStack: ''
    })
    setEditId(null)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    const payload = {
      title: form.title.trim(),
      company: form.company.trim(),
      location: form.location.trim(),
      type: form.type.trim(),
      salary: form.salary.trim(),
      description: form.description.trim(),
      jobTechStack: form.jobTechStack
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    }

    if (!payload.title || !payload.company) {
      setError('Title and company are required')
      return
    }

    try {
      if (editId) {
        const response = await fetch(`${API_URL}/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        if (!response.ok) throw new Error('Failed to update job')
        const updatedJob = await response.json()
        const normalizedUpdatedJob = normalizeJob(updatedJob)
        setJobs((prev) => prev.map((job) => (job.id === editId ? normalizedUpdatedJob : job)))
      } else {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        if (!response.ok) throw new Error('Failed to create job')
        const newJob = await response.json()
        setJobs((prev) => [...prev, normalizeJob(newJob)])
      }
      resetForm()
      navigate('/manage')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEdit = (job) => {
    setEditId(job.id)
    setForm({
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      salary: job.salary,
      description: job.description,
      jobTechStack: Array.isArray(job.jobTechStack) ? job.jobTechStack.join(', ') : ''
    })
    navigate('/create')
  }

  const handleDelete = async (id) => {
    setError('')
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete job')
      setJobs((prev) => prev.filter((job) => job.id !== id))
      if (editId === id) resetForm()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="app-shell">
      <Navbar />
      <header className="page-header">
        <div>
          <h1>Job Posting Manager</h1>
          <p>Browse available jobs and manage postings with a sleek dark interface.</p>
        </div>
      </header>

      <section className="page-content">
        <Routes>
          <Route path="/" element={<Home jobs={jobs} loading={loading} error={error} refresh={fetchJobs} />} />
          <Route
            path="/manage"
            element={
              <div className="glass-card list-card">
                <div className="list-header">
                  <div>
                    <h2>Manage Jobs</h2>
                    <p className="section-note">Edit or remove postings from here.</p>
                  </div>
                  <button onClick={fetchJobs}>Refresh</button>
                </div>
                <JobList jobs={jobs} loading={loading} onEdit={handleEdit} onDelete={handleDelete} />
              </div>
            }
          />
          <Route
            path="/create"
            element={
              <div className="glass-card form-card">
                <JobForm
                  form={form}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  onReset={resetForm}
                  editId={editId}
                  error={error}
                />
              </div>
            }
          />
        </Routes>
      </section>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
