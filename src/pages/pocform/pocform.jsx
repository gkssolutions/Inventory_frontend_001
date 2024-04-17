import React, { useState, useEffect } from 'react';

const PdfGenerator = () => {
  const [data, setData] = useState([]);

  const getData = async (url) => {
    try {
      let response = await fetch(url);
      let jsonData = await response.json();
      return jsonData["products"];
    } catch (err) {
      console.log("error while fetching data");
      return null;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData("https://dummyjson.com/products");
      setData(result);
    };
    fetchData();
  }, []);

  const generateHeaders = () => {
    if (!data || data.length === 0) return null; // Check if data is empty or not available
    let keys = Object.keys(data[0]);
    keys = keys.filter((key) => (key !== "thumbnail" && key !== "images"));
    keys = keys.sort();
    return keys.map((key, index) => <th key={index}>{key}</th>);
  }
  

  const addEachRow = () => {
    return data.map((item, index) => (
      <tr key={index}>
        {Object.keys(item).map((key, index) => (
          <td key={index}>{item[key]}</td>
        ))}
      </tr>
    ));
  }

  return (
    <div>
      <button id="btn-print" className="btn btn-success" onClick={() => window.print()}>Generate PDF</button>
      <div id="empTable">
        <table>
          <thead>
            <tr>
              {generateHeaders()}
            </tr>
          </thead>
          <tbody>
            {addEachRow()}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PdfGenerator;
