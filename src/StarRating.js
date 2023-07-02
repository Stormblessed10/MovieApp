import { useState } from "react"

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "1.6rem",

  color: "#000"
}

const starContainerStyle = {
  display: "flex",
  listStyle: "none",
}

export default function StarRating({ maxRating = 10, color = "#eb6f4c", size = 24, className = "", defaultRating = 0 }) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);
  
  const textStyle = {
    fontSize: `${size}px`,
    color,
  };

  return <div className={className} style={containerStyle}>
    <ul style={starContainerStyle}>
      {Array.from({length: maxRating}, ((_, i) =>
        <Star
          key={i}
          fill={tempRating ? tempRating >= i + 1 : rating >= i + 1}
          onRate={() => setRating(tempRating)}
          onEnter={() => setTempRating(i + 1)}
          onLeave={() => setTempRating(0)}
          size={size}
          color={color}
        />
      ))}
    </ul>
    <span style={textStyle}>{(tempRating || rating)}</span> 
  </div>
}

function Star({ fill, onRate, onEnter, onLeave, color, size }) {
  return <li style={{width: `${size}px`}} role="button" onClick={onRate} onMouseEnter={onEnter} onMouseLeave={onLeave} >
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={fill ? color : "none"}
        viewBox="0 0 24 24"
        stroke={color}
      >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="{2}"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  </li>
}