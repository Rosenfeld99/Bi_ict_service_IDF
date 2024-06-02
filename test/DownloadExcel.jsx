import React from 'react';
import * as XLSX from 'xlsx';

const DownloadExcel = () => {
  // Sample data array with nested array
  const data = [
    { name: 'John', age: 30, city: 'New York' },
    { name: 'Anna', age: 22, city: 'London' },
    { name: 'Mike', age: 32, city: 'San Francisco' },
    { 
      array: [
        { name: 'John', age: 30, city: 'New York' },
        { name: 'Anna', age: 22, city: 'London' },
        { name: 'Mike', age: 32, city: 'San Francisco' }
      ] 
    }
  ];

  const handleDownload = () => {
    // Helper function to flatten the nested array
    const flattenData = (data) => {
      const flatData = [];
      
      data.forEach(item => {
        if (Array.isArray(item.array)) {
          item.array.forEach(nestedItem => {
            flatData.push(nestedItem);
          });
        } else {
          flatData.push(item);
        }
      });
      
      return flatData;
    };

    // Flatten the data
    const flattenedData = flattenData(data);

    // Create a new workbook and a worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(flattenedData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Generate a buffer
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Create a blob from the buffer
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    // Create a link element
    const link = document.createElement('a');

    // Set the link's href to a URL created from the blob
    link.href = URL.createObjectURL(blob);

    // Set the download attribute to the desired file name
    link.download = 'data.xlsx';

    // Append the link to the document body and click it
    document.body.appendChild(link);
    link.click();

    // Remove the link from the document body
    document.body.removeChild(link);
  };

  return (
    <div>
      <h1>Download Excel File</h1>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default DownloadExcel;
