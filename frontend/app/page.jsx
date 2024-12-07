'use client'
import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8765");

    socket.onmessage = (event) => {
      const packet = JSON.parse(event.data);
      setData((prevData) => [...prevData, packet]);
    };

    return () => {
      socket.close();
    };
  }, []);

  // Function to filter data by source IP
  const filteredData = data.filter(packet => packet.src.toLowerCase().includes(filter.toLowerCase()));
  const downloadExcel = (data) => {
    // Convert JSON to CSV
    const headers = ["Timestamp", "Source", "Destination", "Protocol", "Summary", "Direction"];
    const rows = data.map((packet) => [
      new Date(packet.timestamp * 1000).toLocaleString(),
      packet.src,
      packet.dst,
      packet.protocol,
      packet.summary,
      packet.direction,
    ]);

    // Prepare CSV string
    let csv = headers.join("\t") + "\n";
    rows.forEach((row) => {
      csv += row.join("\t") + "\n";
    });

    // Create Blob and trigger download
    const blob = new Blob([csv], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "packets_data.xlsx";
    link.click();
  };
  return (
    <div style={{margin:'1rem'}}>
      <h2>Packet Sniffer Data</h2>
      
      {/* Filter Input */}
      <div>
        <label htmlFor="filter">Filter by Source IP:</label>
        <input
          type="text"
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Type source IP to filter"
        />
      </div>
      <button onClick={() => downloadExcel(filteredData)}>Download Excel</button>
      {/* Table to display the packets */}
      <table border="1" style={{ width: '100%', marginTop: '10px' }}>
        <thead>
          <tr>
            <th>Sno.  </th>
            <th>Source IP</th>
            <th>Destination IP</th>
            <th>Protocol</th>
            <th>Summary</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.reverse().map((packet, index) => (
              <tr key={index} style={{color: packet.direction === 'incoming' ? "green": "red"}}>
                <td>{index+1}.</td>
                <td>{packet.src}</td>
                <td>{packet.dst}</td>
                <td>{packet.protocol}</td>
                <td>{packet.summary}</td>
                <td>{packet.timestamp}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No data to display</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;
