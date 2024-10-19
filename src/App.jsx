import React, { useState } from 'react';
import './App.css';
import certificate from './assets/certificateTemplatecon.png';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const App = () => {
  const [name, setName] = useState('Your Name');
  const [id, setId] = useState('TUBLIAN-12345');
  const [date, setDate] = useState('YYYY-MM-DD');
  const [description, setDescription] = useState("successfully completed the 4-Week AI Internship Program at Tublian,demonstrating exceptional dedication and a commendable work ethic throughout the internship. The contributions made, including the development of an advanced chatbot, have added significant value to the AI community.");

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`; 
  };

  const downloadPDF = () => {
    const input = document.querySelector('.container');
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [input.offsetWidth, input.offsetHeight],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, input.offsetWidth, input.offsetHeight, undefined, 'FAST');
      pdf.save(`${id}.pdf`);
    });
  };

  return (
    <div>
      <center><h1 className="title">Certificate Generator</h1></center>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="date"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(formatDate(e.target.value))}
      />
      <br />
      <textarea name="" value={description} onChange={(e) => setDescription(e.target.value)} id="" cols="30" placeholder="Description" rows="9"></textarea>
      <div className="container">
        <img src={certificate} alt="certificate" height={594} />
        <div className="content">
          <h1>{name}</h1>
          <p className="desc">
            {description}
          </p>
          <h4 className="id">{id}</h4>
          <h4 className="date">{date}</h4>
        </div>
      </div>
      <center>
        <button onClick={downloadPDF}>Download</button>
      </center>
    </div>
  );
};

export default App;
