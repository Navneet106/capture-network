### README

# Network Traffic Capture and Filtering

This project captures and monitors network traffic on a given interface, allowing you to capture all incoming and outgoing packets, and optionally filter packets based on a specified IP address. The captured packets are saved in JSON files, and you can download them in Excel format. This script uses the `scapy` library for packet sniffing and Python's built-in functionalities for handling the data.

---

## Story Behind the Project

### Initial Approach: Terminal-based Packet Capture

The journey began by understanding the core concept of packet sniffing. Initially, I wrote a simple Python script using the `scapy` library, which could capture packets from the network interface and save the captured data in a `.pcap` file. This file format is commonly used to store network traffic data, and it allowed me to easily monitor and store packets for further analysis. The goal was to capture all network traffic, both incoming and outgoing, for a given network interface.

Here’s how I started:

1. **Scapy Sniffing**: I used `scapy`'s built-in sniffing capabilities to capture packets in real time.
2. **PCAP File**: Instead of directly processing the captured packets, I first focused on saving them to a `.pcap` file. This would allow me to later analyze or export the data if needed.
3. **Basic Capture**: The program was simple and terminal-based, with minimal filtering capabilities at this point. It saved all packets, regardless of their source or destination.
`The File Name where this code is present at is captureTraffic.py`

This early version of the script helped me understand how to capture network traffic, and provided a foundation for further improvements.

---

### Moving to Backend: Capturing Packets and Filtering by IP [Present in the Backend-approcah branch]

Once I had a basic packet capturing script working, I realized that it would be beneficial to introduce some filtering based on specific IP addresses. The idea was to capture all packets, but if the user specified an IP, only packets involving that IP (either as the source or destination) would be captured.

To achieve this, I added a few improvements:

1. **IP Filtering**: I used `scapy` to inspect each packet and checked if the source or destination IP matched the user’s specified IP. If it matched, the packet would be captured; otherwise, it would be ignored.
2. **Separate File for Filtered Packets**: If an IP address was provided, the filtered packets were saved in a separate `.pcap` or `.json` file. This allowed me to keep both the full capture and the filtered capture distinct.
3. **Backend Logic**: The backend of the system was simple but effective. It was still a command-line tool where the user would start the packet capture and provide an IP address to filter. At this point, the program ran in the terminal and displayed real-time packet information.

---

### Adding WebSocket for Real-Time Monitoring

After successfully capturing packets and filtering by IP, I wanted to make the data more accessible and interactive. I realized that having a terminal-only application would be limiting, so I decided to move to a web-based solution that would allow users to see the captured packets in real time.

Here’s how I expanded the project:

1. **WebSocket Integration**: I introduced `websockets`, a Python library that allows real-time communication between the server and the client (web browser). I used WebSocket to broadcast captured packet data to the front end as soon as they were sniffed.
2. **Frontend Interface**: The frontend was created as a simple web page, which connected to the WebSocket server. The captured packet data was displayed in real time on the page.
3. **Packet Display**: On the web interface, I used a simple table to show packet details like the source IP, destination IP, protocol, and summary of the packet. This allowed users to see all incoming and outgoing network traffic in a user-friendly manner.
4. **Web Interface for Filtering**: The user could specify an IP address via the web interface, and the user see the filter the packets accordingly. The filtered packets were displayed in real-time on the frontend.
   
By integrating WebSockets, I could push updates to the frontend whenever a new packet was captured, giving users an instant view of network activity. The frontend displayed the captured data dynamically in a simple table format, making it easy to monitor and analyze network traffic.

---

### Adding Data Download Feature

With the real-time WebSocket server and frontend interface working, I wanted to provide a more useful way to work with the captured data. I added a feature to allow users to download the captured data in Excel format.

Here’s how I achieved it:

1. **Excel Download**: I created an option on the web interface to download the captured packets as an Excel file. This allowed users to download both filtered and unfiltered packets. I implemented the download functionality using native JavaScript ,so the user could export the data without relying on any external libraries.
2. **Filtered Download**: If the user applied a filter (e.g., by IP address), the downloaded Excel file would contain only the packets that met the filter criteria. If no filter was applied, all packets would be included in the download.

---

### Final Thoughts

At the end of this journey, I had a full-fledged network traffic monitoring system. The solution captures all network traffic, optionally filters by IP address, broadcasts captured packets to a web interface using WebSockets, and allows the user to download the packet data in Excel format.

The final solution is a robust, interactive tool that allows real-time monitoring of network traffic and provides an intuitive way to analyze the data. Here's a quick summary of the final steps:

1. **Scapy for Packet Sniffing**: Captured all network packets.
2. **IP Filtering**: Captured only packets involving the specified IP address.
3. **WebSocket for Real-Time Data**: Enabled live packet display in a web interface.
4. **Excel Download**: Allowed users to download the captured data, filtered or unfiltered.

This solution, while simple, demonstrates the power of combining Python’s `scapy` for packet sniffing with modern web technologies like WebSockets to create a real-time network monitoring tool.

# How to Run

### 1. Install Dependencies

You need to install `scapy` to run this script. You can install it using `pip`:

```bash
pip install scapy
```

### 2. Running the Script

To run the packet sniffer, execute the following command:

```bash
python packet-sniffer.py
```

This will start the script, begin capturing traffic on the specified network interface, and save packets in a JSON file.

If you want to specify an IP address to filter packets, you can pass it as an argument to the script.

### 3. Web Interface

Once the packet sniffer is running, you can access the WebSocket server by visiting:

```
ws://localhost:8765
```

The WebSocket will broadcast captured packet information in real time, which can be displayed in a simple table format in the web browser.

### 4. Download Data

To download captured data, either filtered or unfiltered, use the download button provided in the web interface. The data will be available as an Excel file.

## Dependencies

- `scapy`: For packet sniffing and network traffic analysis.
- `websockets`: For broadcasting captured packets to the web interface in real time.
- Python's built-in libraries for file handling and Excel conversion.

## Notes

- The script runs indefinitely until manually stopped. It will continuously capture packets and update the output files.
- Make sure to run the script with appropriate permissions (administrative/root) for capturing network traffic.
  
