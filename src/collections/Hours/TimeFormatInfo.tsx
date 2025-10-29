import React from 'react'
import { Info } from 'lucide-react'

export const TimeFormatInfo: React.FC = () => {
  return (
    <div
      style={{
        padding: '16px',
        backgroundColor: '#2a2a2a',
        border: '1px solid #444',
        borderRadius: '4px',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <Info size={16} color="#ffffff" />
      <p style={{ margin: 0, fontSize: '14px', color: '#ffffff' }}>
        <strong>Time Format:</strong> Please use 12-hour format with AM/PM (e.g., 9:00 AM, 5:30 PM)
      </p>
    </div>
  )
}
