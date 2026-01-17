import React from "react";
import { WeightInputProps } from "../types";

export default function WeightInput({ keyName, label, value, onChange }: WeightInputProps) {
    return (
        <label style={{ display: "block", marginBottom: 10 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>{label}</div>
            <input
                type="number"
                min={0}
                step={1}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: "1px solid #ddd",
                }}
                aria-label={keyName}
            />
        </label>
    );
}

