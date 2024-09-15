import React, { useState } from 'react';

const FileUploader = () => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.fileContent && result.summaryText) {
        setSummary(result.summaryText);
      } else {
        setSummary('Summary could not be generated or an error occurred.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setSummary('Error occurred during file upload.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className='px-14 pt-10 h-full w-full'>
      <h2 className='font-bold text-xl pl-28'>File Summarizer</h2>
      <p className='text-red-500 pl-28'>please upload small size of files with less than 600 words</p>

      <div className='h-4/6 w-full flex justify-center'>
        <div className='h-4/5 w-8/12 flex justify-center items-center mt-9 bg-teal-300'>
          <div className='h-4/5 w-11/12 bg-teal-300 flex justify-center items-center border-dashed border-2 border-slate-200'>
            <input type="file" onChange={handleFileChange}
            />
          </div>
        </div>
      </div>

      {loading && <p className='pl-28'>Summarizing file...</p>}

      {loading || (summary && (
        <div className='px-28 pb-36'>
          <h3 className='font-bold'>Summary:</h3>
          <p >{summary}</p>
        </div>
      ))}
    </div>
  );
};

export default FileUploader;
