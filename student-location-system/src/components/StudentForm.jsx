import { useState } from 'react'
import { Form, Button, Card, Spinner, Alert } from 'react-bootstrap'

// ── Available courses ──────────────────────────────────────────
const COURSES = [
  { value: 'BSCS', label: 'BS Computer Science' },
  { value: 'BSIT', label: 'BS Information Technology' },
  { value: 'BSBA', label: 'BS Business Administration' },
  { value: 'BSED', label: 'BS Education' },
  { value: 'BSME', label: 'BS Mechanical Engineering' },
  { value: 'BSN', label: 'BS Nursing' },
  { value: 'BSECE', label: 'BS Electronics Engineering' },
  { value: 'BSIE', label: 'BS Industrial Engineering' },
  { value: 'BSARCH', label: 'BS Architecture' },
  { value: 'BSCRIM', label: 'BS Criminology' },
  { value: 'BSPSYCH', label: 'BS Psychology' },
  { value: 'BSACCT', label: 'BS Accountancy' },
]

// ── Geocode address using Nominatim ───────────────────────────
const geocodeAddress = async (address) => {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`
  const res = await fetch(url, {
    headers: { 'Accept-Language': 'en', 'User-Agent': 'StudentLocationSystem/1.0 (school-activity)' },
  })
  if (!res.ok) throw new Error('Network error. Please try again.')
  const data = await res.json()
  if (!data || data.length === 0)
    throw new Error('Address not found. Try adding a city or province (e.g. "Makati City, Metro Manila").')
  return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }
}

const initialForm = {
  firstname: '',
  lastname: '',
  course: '',
  email: '',
  address: '',
}

// ── Field label with small red asterisk ───────────────────────
function FieldLabel({ children }) {
  return (
    <Form.Label className="fw-semibold mb-1" style={{ fontSize: '0.8rem', color: '#374151' }}>
      {children} <span style={{ color: '#ef4444' }}>*</span>
    </Form.Label>
  )
}

function StudentForm({ onAddStudent }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null) // { type: 'success' | 'error', message }

  // ── Validation ──────────────────────────────────────────────
  const validate = () => {
    const errs = {}
    if (!form.firstname.trim()) errs.firstname = 'First name is required.'
    if (!form.lastname.trim()) errs.lastname = 'Last name is required.'
    if (!form.course) errs.course = 'Please select a course.'
    if (!form.email.trim()) {
      errs.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address.'
    }
    if (!form.address.trim()) errs.address = 'Address is required.'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
    setStatus(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setLoading(true)
    setStatus(null)
    try {
      const coords = await geocodeAddress(form.address)
      onAddStudent({ ...form, lat: coords.lat, lng: coords.lng })
      setForm(initialForm)
      setErrors({})
      setStatus({ type: 'success', message: '✓ Student registered successfully!' })
    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card
      className="border-0 h-100"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)', borderRadius: 12 }}
    >
      {/* ── Card Header ── */}
      <Card.Header
        className="border-0 d-flex align-items-center gap-2 px-4 py-3"
        style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)',
          borderRadius: '12px 12px 0 0',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="white"
          viewBox="0 0 16 16"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4z" />
        </svg>
        <span className="fw-semibold text-white" style={{ fontSize: '0.9rem' }}>
          Register New Student
        </span>
      </Card.Header>

      {/* ── Card Body ── */}
      <Card.Body className="px-4 py-4">
        {/* Status alert */}
        {status && (
          <Alert
            variant={status.type === 'success' ? 'success' : 'danger'}
            className="py-2 px-3 mb-3"
            style={{ fontSize: '0.82rem', borderRadius: 8 }}
            dismissible
            onClose={() => setStatus(null)}
          >
            {status.message}
          </Alert>
        )}

        <Form onSubmit={handleSubmit} noValidate>
          {/* First & Last Name row */}
          <div className="row g-3 mb-3">
            <div className="col-6">
              <Form.Group>
                <FieldLabel>First Name</FieldLabel>
                <Form.Control
                  id="input-firstname"
                  type="text"
                  name="firstname"
                  value={form.firstname}
                  onChange={handleChange}
                  placeholder="Juan"
                  isInvalid={!!errors.firstname}
                  style={{ fontSize: '0.85rem', borderRadius: 8 }}
                />
                <Form.Control.Feedback type="invalid" style={{ fontSize: '0.75rem' }}>
                  {errors.firstname}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="col-6">
              <Form.Group>
                <FieldLabel>Last Name</FieldLabel>
                <Form.Control
                  id="input-lastname"
                  type="text"
                  name="lastname"
                  value={form.lastname}
                  onChange={handleChange}
                  placeholder="Dela Cruz"
                  isInvalid={!!errors.lastname}
                  style={{ fontSize: '0.85rem', borderRadius: 8 }}
                />
                <Form.Control.Feedback type="invalid" style={{ fontSize: '0.75rem' }}>
                  {errors.lastname}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>

          {/* Course */}
          <Form.Group className="mb-3">
            <FieldLabel>Course</FieldLabel>
            <Form.Select
              id="input-course"
              name="course"
              value={form.course}
              onChange={handleChange}
              isInvalid={!!errors.course}
              style={{ fontSize: '0.85rem', borderRadius: 8 }}
            >
              <option value="">— Select a course —</option>
              {COURSES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.value} &mdash; {c.label}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid" style={{ fontSize: '0.75rem' }}>
              {errors.course}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3">
            <FieldLabel>Email Address</FieldLabel>
            <Form.Control
              id="input-email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="juan@example.com"
              isInvalid={!!errors.email}
              style={{ fontSize: '0.85rem', borderRadius: 8 }}
            />
            <Form.Control.Feedback type="invalid" style={{ fontSize: '0.75rem' }}>
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Address */}
          <Form.Group className="mb-4">
            <FieldLabel>Address</FieldLabel>
            <Form.Control
              id="input-address"
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Makati City, Metro Manila"
              isInvalid={!!errors.address}
              style={{ fontSize: '0.85rem', borderRadius: 8 }}
            />
            <Form.Text style={{ fontSize: '0.74rem', color: '#6b7280' }}>
              📍 Your address will be converted into coordinates.
            </Form.Text>
            <Form.Control.Feedback type="invalid" style={{ fontSize: '0.75rem' }}>
              {errors.address}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Submit */}
          <Button
            id="btn-register"
            type="submit"
            variant="primary"
            className="w-100 fw-semibold py-2"
            disabled={loading}
            style={{
              borderRadius: 8,
              background: loading ? undefined : 'linear-gradient(135deg, #1e3a8a, #1d4ed8)',
              border: 'none',
              fontSize: '0.88rem',
              letterSpacing: '0.01em',
            }}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Locating Address…
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  className="me-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4z" />
                </svg>
                Register Student
              </>
            )}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default StudentForm
