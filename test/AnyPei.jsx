import React, { useState } from 'react';

const ProgressPie = ({ percentage }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle
        cx="60"
        cy="60"
        r={radius}
        fill="none"
        stroke="#e0e0df"
        strokeWidth="10"
      />
      <circle
        cx="60"
        cy="60"
        r={radius}
        fill="none"
        stroke="#4caf50"
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 60 60)"
      />
      <text
        x="60"
        y="60"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="20"
        fill="#000"
      >
        {`${percentage}%`}
      </text>
    </svg>
  );
};

const AnyPei = () => {
  const [percentage, setPercentage] = useState(50); // Default percentage

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setPercentage(value);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Round Progress Pie</h1>
      <input
        type="number"
        value={percentage}
        onChange={handleChange}
        min="0"
        max="100"
        style={{ marginBottom: '20px', padding: '5px' }}
      />
      <ProgressPie percentage={percentage} />
    </div>
  );
};

export default AnyPei;
