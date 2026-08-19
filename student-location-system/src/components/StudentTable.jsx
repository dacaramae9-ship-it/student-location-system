import { Badge, Button, Card, Table } from 'react-bootstrap'

// ── Course → badge color map ──────────────────────────────────
const BADGE_COLORS = {
  BSCS: '#1d4ed8',
  BSIT: '#0891b2',
  BSBA: '#b45309',
  BSED: '#15803d',
  BSME: '#b91c1c',
  BSN: '#7c3aed',
  BSECE: '#0f766e',
  BSIE: '#c2410c',
  BSARCH: '#4d7c0f',
  BSCRIM: '#be123c',
  BSPSYCH: '#7e22ce',
  BSACCT: '#1e40af',
}

// ── Empty state illustration ───────────────────────────────────
function EmptyState() {
  return (
    <div className="text-center py-5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="52"
        height="52"
        fill="#cbd5e1"
        className="mb-3"
        viewBox="0 0 16 16"
      >
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4z" />
      </svg>
      <p className="mb-1 fw-semibold" style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
        No students registered yet
      </p>
      <p style={{ color: '#cbd5e1', fontSize: '0.78rem' }}>
        Fill in the form above to add your first student.
      </p>
    </div>
  )
}

function StudentTable({ students, onDelete, onSelect, selectedStudent }) {
  return (
    <Card
      className="border-0 mb-4"
      style={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
        borderRadius: 12,
      }}
    >
      {/* ── Header ── */}
      <Card.Header
        className="bg-white border-bottom d-flex align-items-center justify-content-between px-4 py-3"
        style={{ borderRadius: '12px 12px 0 0' }}
      >
        <div>
          <h5 className="mb-0 fw-bold" style={{ fontSize: '0.95rem', color: '#1e293b' }}>
            Student Records
          </h5>
          <span style={{ fontSize: '0.76rem', color: '#94a3b8' }}>
            All registered students. Click a row to highlight on map.
          </span>
        </div>
        <span
          className="badge"
          style={{
            background: '#1d4ed8',
            fontSize: '0.78rem',
            borderRadius: 20,
            padding: '6px 14px',
          }}
        >
          {students.length} {students.length === 1 ? 'Record' : 'Records'}
        </span>
      </Card.Header>

      {/* ── Body ── */}
      <Card.Body className="p-0">
        {students.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="table-responsive">
            <Table className="mb-0 align-middle" style={{ fontSize: '0.83rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', color: '#64748b' }}>
                  <th className="ps-4 py-3 fw-semibold border-0" style={{ width: 48 }}>
                    #
                  </th>
                  <th className="py-3 fw-semibold border-0">Student</th>
                  <th className="py-3 fw-semibold border-0">Course</th>
                  <th className="py-3 fw-semibold border-0">Email</th>
                  <th className="py-3 fw-semibold border-0">Address</th>
                  <th className="py-3 fw-semibold border-0">Coordinates</th>
                  <th className="py-3 fw-semibold border-0 pe-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => {
                  const isSelected = selectedStudent?.id === student.id
                  return (
                    <tr
                      key={student.id}
                      id={`student-row-${student.id}`}
                      onClick={() => onSelect(student)}
                      style={{
                        backgroundColor: isSelected ? '#eff6ff' : 'white',
                        borderLeft: isSelected ? '3px solid #1d4ed8' : '3px solid transparent',
                        transition: 'background 0.15s ease',
                        cursor: 'pointer',
                      }}
                    >
                      {/* # */}
                      <td className="ps-4 py-3">
                        <span
                          className="d-inline-flex align-items-center justify-content-center fw-semibold"
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: '50%',
                            backgroundColor: isSelected ? '#dbeafe' : '#f1f5f9',
                            color: isSelected ? '#1d4ed8' : '#64748b',
                            fontSize: '0.75rem',
                          }}
                        >
                          {index + 1}
                        </span>
                      </td>

                      {/* Name */}
                      <td className="py-3 fw-semibold" style={{ color: '#1e293b' }}>
                        {student.firstname} {student.lastname}
                      </td>

                      {/* Course badge */}
                      <td className="py-3">
                        <span
                          className="badge"
                          style={{
                            background: BADGE_COLORS[student.course] || '#475569',
                            fontSize: '0.72rem',
                            borderRadius: 5,
                            padding: '4px 8px',
                          }}
                        >
                          {student.course}
                        </span>
                      </td>

                      {/* Email */}
                      <td className="py-3" style={{ color: '#475569' }}>
                        {student.email}
                      </td>

                      {/* Address */}
                      <td className="py-3" style={{ color: '#475569' }}>
                        {student.address}
                      </td>

                      {/* Coordinates */}
                      <td className="py-3" style={{ fontFamily: 'monospace', color: '#94a3b8', fontSize: '0.75rem' }}>
                        <div>Lat: {student.lat.toFixed(5)}</div>
                        <div>Lng: {student.lng.toFixed(5)}</div>
                      </td>

                      {/* Delete */}
                      <td className="py-3 pe-4">
                        <Button
                          id={`btn-delete-${student.id}`}
                          variant="outline-danger"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            onDelete(student.id)
                          }}
                          style={{ fontSize: '0.75rem', borderRadius: 6, padding: '3px 12px' }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>
    </Card>
  )
}

export default StudentTable
