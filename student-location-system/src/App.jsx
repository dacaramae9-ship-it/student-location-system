import { useState } from 'react'
import StudentForm from './components/StudentForm'
import StudentMap from './components/StudentMap'
import StudentTable from './components/StudentTable'

function App() {
  const [students, setStudents] = useState([])
  const [selectedStudent, setSelectedStudent] = useState(null)

  const addStudent = (student) => {
    setStudents((prev) => [...prev, { ...student, id: Date.now() }])
  }

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id))
    if (selectedStudent?.id === id) setSelectedStudent(null)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f0f4f8' }}>
      {/* ── Navbar ── */}
      <nav
        className="shadow-sm"
        style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)' }}
      >
        <div className="container-xl px-4 py-3 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            {/* Logo icon */}
            <div
              className="d-flex align-items-center justify-content-center rounded-2"
              style={{
                width: 38,
                height: 38,
                backgroundColor: 'rgba(255,255,255,0.18)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="white"
                viewBox="0 0 16 16"
              >
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
              </svg>
            </div>
            <div>
              <div
                className="fw-bold text-white"
                style={{ fontSize: '1rem', lineHeight: 1.2 }}
              >
                Student Location System
              </div>
              <div style={{ fontSize: '0.72rem', color: '#bfdbfe' }}>
                Geolocation &amp; Student Registry
              </div>
            </div>
          </div>

          <div
            className="d-none d-md-flex align-items-center gap-2 px-3 py-1 rounded-pill"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', fontSize: '0.8rem', color: '#e0f2fe' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4z" />
            </svg>
            <span>
              <strong>{students.length}</strong> student{students.length !== 1 ? 's' : ''} registered
            </span>
          </div>
        </div>
      </nav>

      {/* ── Main Content ── */}
      <div className="container-xl px-4 py-4">
        {/* Top row: Form + Map */}
        <div className="row g-4 mb-4">
          <div className="col-12 col-lg-5">
            <StudentForm onAddStudent={addStudent} />
          </div>
          <div className="col-12 col-lg-7">
            <StudentMap
              students={students}
              selectedStudent={selectedStudent}
              onSelectStudent={setSelectedStudent}
            />
          </div>
        </div>

        {/* Student Table */}
        <StudentTable
          students={students}
          onDelete={deleteStudent}
          onSelect={setSelectedStudent}
          selectedStudent={selectedStudent}
        />
      </div>

      {/* Footer */}
      <footer className="text-center py-3" style={{ color: '#94a3b8', fontSize: '0.78rem' }}>
        Student Location System &mdash; Web Systems &amp; Technologies Activity 8
      </footer>
    </div>
  )
}

export default App
