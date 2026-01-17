import React from 'react'
import { SelectProps } from '../types'

export default function Select<Id extends string>({ label, value, onChange, options }: SelectProps<Id>) {
    return (
        <label style={{ display: "block", marginBottom: 12 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>{label}</div>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value as Id)}
                style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: "1px solid #ddd",
                }}
            >
                {options.map((o) => (
                    <option key={o.id} value={o.id}>
                        {o.label}
                    </option>
                ))}
            </select>
        </label>
    )
}
