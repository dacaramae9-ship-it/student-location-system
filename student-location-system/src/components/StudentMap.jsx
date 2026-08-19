import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Card } from 'react-bootstrap'
import L from 'leaflet'

// ── Fix Leaflet's default icon paths (broken in Vite) ─────────
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// ── Custom selected (highlighted) icon ───────────────────────
const selectedIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

// ── Inner component: flies to selectedStudent ─────────────────
function MapController({ selectedStudent }) {
  const map = useMap()
  useEffect(() => {
    if (selectedStudent) {
      map.flyTo([selectedStudent.lat, selectedStudent.lng], 15, { duration: 1.2 })
    }
  }, [selectedStudent, map])
  return null
}

// ── Popup content ─────────────────────────────────────────────
function StudentPopup({ student }) {
  return (
    <div style={{ minWidth: 170 }}>
      <div
        className="fw-bold mb-1"
        style={{ fontSize: '0.9rem', color: '#1e3a8a' }}
      >
        {student.firstname} {student.lastname}
      </div>
      <div style={{ fontSize: '0.78rem', color: '#4b5563' }}>
        <div className="mb-1">
          <span
            className="badge"
            style={{
              background: '#1d4ed8',
              fontSize: '0.7rem',
              borderRadius: 4,
            }}
          >
            {student.course}
          </span>
        </div>
        <div>✉️ {student.email}</div>
        <div>📍 {student.address}</div>
        <div style={{ color: '#9ca3af', fontSize: '0.72rem', marginTop: 4 }}>
          {student.lat.toFixed(5)}, {student.lng.toFixed(5)}
        </div>
      </div>
    </div>
  )
}

// ── Main Map component ────────────────────────────────────────
const MANILA_CENTER = [14.5995, 120.9842]

function StudentMap({ students, selectedStudent, onSelectStudent }) {
  return (
    <Card
      className="border-0 h-100"
      style={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
        borderRadius: 12,
      }}
    >
      {/* Header */}
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
          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
        </svg>
        <span className="fw-semibold text-white" style={{ fontSize: '0.9rem' }}>
          Location Map
        </span>
        <span
          className="ms-auto badge"
          style={{
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            fontSize: '0.75rem',
            borderRadius: 20,
          }}
        >
          {students.length} marker{students.length !== 1 ? 's' : ''}
        </span>
      </Card.Header>

      {/* Map */}
      <div
        style={{
          height: 420,
          borderRadius: '0 0 12px 12px',
          overflow: 'hidden',
        }}
      >
        <MapContainer
          center={MANILA_CENTER}
          zoom={11}
          style={{ height: '100%', width: '100%' }}
          id="student-map"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {students.map((student) => (
            <Marker
              key={student.id}
              position={[student.lat, student.lng]}
              icon={selectedStudent?.id === student.id ? selectedIcon : new L.Icon.Default()}
              eventHandlers={{
                click: () => onSelectStudent(student),
              }}
            >
              <Popup>
                <StudentPopup student={student} />
              </Popup>
            </Marker>
          ))}

          <MapController selectedStudent={selectedStudent} />
        </MapContainer>
      </div>
    </Card>
  )
}

export default StudentMap
