import React from 'react';
import * as XLSX from 'xlsx';
import useDataStore from '../src/hooks/useDataStore';
import Toast from '../src/utils/tostify/Toast';

const DownloadExcel = ({ iconToDownload }) => {
  const { data, handelToast, toast, setShowToast, showToast } = useDataStore()

  // Sample data for different sheets
  const handleCreateExcle = () => {
    let createList = []

    for (let index = 0; index < data.length; index++) {
      const element = data[index].battalion;
      let createListSheets = []
      for (let j = 0; j < element.length; j++) {
        const currBattalion = element[j];

        createListSheets.push({ "יחידה": currBattalion.battalionName, "אמצעים": "", "סוג אמצעים": "", "כמות": "", "תקינות תקשובית": "", "אחוזים": currBattalion.percentOfUnit, "אחוזים פרטניים": "" })
        for (let t = 0; t < currBattalion.means.length; t++) {
          createListSheets.push({ "אמצעים": currBattalion.means[t].meansName, "סוג אמצעים": currBattalion.means[t].meanType, "כמות": currBattalion.means[t].amount, "תקינות תקשובית": currBattalion.means[t].properICT, "תקינות חימושית": currBattalion.means[t].properAmm, "אחוזים פרטניים": currBattalion.means[t].procent, "הערות": currBattalion.means[t].comments })
        }
      }
      createList.push({ sheetsName: data[index].brigadeName, table: createListSheets })
    }
    // console.log(createList);
    if (createList.length == 0 || createList.length == []) {
      return handelToast("אזהרה", "ניראה שאין נתונים להוריד", "Warning", 10)
    } else {
      handleDownload(createList)
      return handelToast("הצלחה", "הקובץ נוצר בהצלחה", "Success", 10)
    }
  }




  const handleDownload = (createList) => {

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    for (let index = 0; index < createList.length; index++) {

      // Convert data to worksheets and append to the workbook
      const worksheet = XLSX.utils.json_to_sheet(createList[index].table);
      XLSX.utils.book_append_sheet(workbook, worksheet, createList[index].sheetsName);

    }

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
    <>
      {/* Toast */}
      {showToast && (
        <Toast
          setShow={setShowToast}
          show={showToast}
          title={toast.title}
          message={toast.message}
          time={toast.time}
          type={toast.type}
        />
      )}
      <button onClick={handleCreateExcle}>{iconToDownload}</button>
    </>
  );
};

export default DownloadExcel;
