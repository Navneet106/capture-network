# Network Traffic Capture and Filtering

A robust, real-time network traffic monitoring tool that captures and filters network packets. It includes features for packet capture, IP-based filtering, real-time visualization via WebSocket, and exporting data to Excel format. Designed with a Python-based backend and a Next.js frontend, this project combines the power of `scapy` for packet sniffing and modern web technologies for visualization.

---

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
  - [Running the Backend](#running-the-backend)
  - [Running the Frontend](#running-the-frontend)
  - [Web Interface](#web-interface)
  - [Exporting Data](#exporting-data)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Notes](#notes)
- [Future Enhancements](#future-enhancements)

---

## Introduction

This project captures network traffic on a specified interface, with optional filtering by IP address. Packets are saved in JSON format, displayed in real-time on a web interface, and downloadable as Excel files. It integrates Python for backend processing and Next.js for a seamless user interface.

---

## Features

- **Packet Capture:** Monitors incoming and outgoing packets.
- **IP-Based Filtering:** Filters packets based on user-specified IP addresses.
- **Real-Time Monitoring:** Displays live traffic data via WebSocket.
- **Data Export:** Allows exporting captured data to Excel format.
- **Cross-Platform:** Compatible with Windows, macOS, and Linux.

---

## Prerequisites

1. **Python (v3.8 or above)**  
   [Download Python](https://www.python.org/downloads/)

2. **Node.js (v18 or above)**  
   [Download Node.js](https://nodejs.org/)

3. **Additional Requirements for Windows:**  
   - Install [Npcap](https://npcap.com/) for packet sniffing.

---

## Installation

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Navneet106/capture-network/
   cd capture-network
   ```

2. Create a virtual environment (optional but recommended):
   - **Windows**:
     ```bash
     python -m venv env
     .\env\Scripts\activate
     ```
   - **macOS/Linux**:
     ```bash
     python3 -m venv env
     source env/bin/activate
     ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Windows users: Install [Npcap](https://npcap.com/).

---

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## Usage

### Running the Backend

Run the Python script to start packet sniffing:
```bash
python python-sniffer.py
```

### Running the Frontend

Start the Next.js development server:
```bash
npm run dev
```

### Web Interface

Access the web interface at [http://localhost:3000](http://localhost:3000). The captured packets will be displayed in a dynamic table, with filtering options available.

### Exporting Data

Captured packets can be downloaded in Excel format using the **Download** button on the web interface.

---

## Project Structure

- **Backend:** Handles packet capture and IP filtering using Python and `scapy`.
- **Frontend:** Provides a real-time interface built with Next.js and WebSocket integration.

---

## Dependencies

- **Python Libraries:**
  - `scapy` - Packet sniffing and network analysis.
  - `websockets` - Real-time WebSocket communication.

- **Node.js Libraries:**  
  Listed in `frontend/package.json`.

---

## Notes

- Run the backend with administrative/root permissions for capturing network traffic.
- Ensure Python and Node.js are added to the system's PATH environment variable.

---

## Future Enhancements

- Add protocol-based filtering.
- Include advanced analytics and visualization for captured data.
- Support exporting data in additional formats (e.g., CSV, JSON).

![Screenshot 2024-12-07 at 16-12-38 Packet Sniffer](https://github.com/user-attachments/assets/9c02d9f4-faec-4607-b26f-caf6006aa6bc)

![Screenshot 2024-12-07 at 16-12-54 Packet Sniffer](https://github.com/user-attachments/assets/242328e7-497c-4aea-9a34-b7644a44dbf2)
