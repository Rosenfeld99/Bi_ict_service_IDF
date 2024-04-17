import React from 'react';

const ProgressPeiTest = ({ value }) => {
  // Ensure value is a number, default to 0 if not
  const parsedValue = typeof value === 'number' ? value : 15;

  // Calculate the percentage value
  const percentage = Math.min(100, Math.max(0, parsedValue)); // Ensure the value is between 0 and 100

  // Calculate the strokeDasharray and strokeDashoffset based on the percentage
  const circumference = 2 * Math.PI * 45; // Circumference of the circle with radius 45%
  const dashArray = [circumference * (percentage / 100), circumference]; // Length of green dash and total circumference
  const dashOffset = circumference * (1 - (percentage / 100)); // Offset to start dash from

  return (
    <div className="mx-auto grid grid-cols-1 gap-12">
      <div className="flex justify-center">
        <svg className="w-24 h-24">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="transparent"
            stroke="#ddd"
            strokeWidth="8"
            
          />
          <circle
            className="transition-all ease-in-out duration-500"
            cx="50%"
            cy="50%"
            r="45%"
            fill="transparent"
            stroke="#38a169"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={dashArray.join(' ')} // Set strokeDasharray to create dashed circle
            strokeDashoffset={dashOffset} // Set strokeDashoffset to display a portion of the circle
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xl font-semibold"
          >
            {percentage}%
          </text>
        </svg>
      </div>
    </div>
  );
};

export default ProgressPeiTest;

// import React from 'react';

// const ProgressPeiTest = ({ value }) => {
//   // Ensure value is a number, default to 0 if not
//   const parsedValue = typeof value === 'number' ? value : 0;

//   // Calculate the percentage value from 100%
//   const percentage = Math.min(100, Math.max(0, parsedValue)); // Ensure the value is between 0 and 100

//   // Calculate the strokeDasharray and strokeDashoffset based on the percentage
//   const circumference = 2 * Math.PI * 45; // Circumference of the circle with radius 45%
//   const dashArray = [circumference * ((100 - percentage) / 100), circumference]; // Length of green dash and total circumference
//   const dashOffset = circumference * (1 - ((100 - percentage) / 100)); // Offset to start dash from

//   // Determine the stroke color based on the percentage
//   let strokeColor = "#38a169"; // Default color
//   if (percentage < 30) {
//     strokeColor = "#ff0000"; // Red if percentage is less than 30
//   } else if (percentage < 70) {
//     strokeColor = "#ffa500"; // Orange if percentage is less than 70
//   }

//   return (
//     <div className="mx-auto grid grid-cols-1 gap-12">
//       <div className="flex justify-center">
//         <svg className="w-24 h-24">
//           <circle
//             cx="50%"
//             cy="50%"
//             r="45%"
//             fill="transparent"
//             stroke="#ddd"
//             strokeWidth="8"
//           />
//           <circle
//             className="transition-all ease-in-out duration-500"
//             cx="50%"
//             cy="50%"
//             r="45%"
//             fill="transparent"
//             stroke={strokeColor}
//             strokeWidth="8"
//             strokeLinecap="round"
//             strokeDasharray={dashArray.join(' ')} // Set strokeDasharray to create dashed circle
//             strokeDashoffset={dashOffset} // Set strokeDashoffset to display a portion of the circle
//           />
//           <text
//             x="50%"
//             y="50%"
//             textAnchor="middle"
//             dominantBaseline="middle"
//             className="text-xl font-semibold"
//           >
//             {percentage}%
//           </text>
//         </svg>
//       </div>
//     </div>
//   );
// };

// export default ProgressPeiTest;

