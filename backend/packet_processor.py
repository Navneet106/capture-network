import os
import json
from datetime import datetime
from scapy.all import sniff, wrpcap

def process_and_save_packets(output_dir="data"):
    packets = {"incoming": [], "outgoing": []}
    all_sniffed_packets = []

    # Get start time for file naming
    start_time = datetime.now().strftime("%Y%m%d_%H%M%S")
    pcap_file = os.path.join(output_dir, f"packets_{start_time}_to_")
    output_file = os.path.join(output_dir, "processed_data.json")

    def packet_callback(packet):
        if packet.haslayer('IP'):
            direction = "outgoing" if packet['IP'].src == "YOUR_LOCAL_IP" else "incoming"
            packet_data = {
                "src": packet['IP'].src,
                "dst": packet['IP'].dst,
                "protocol": packet.summary().split()[0],
                "summary": packet.summary(),
                "time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            }
            packets[direction].append(packet_data)
            all_sniffed_packets.append(packet)

    # Ensure the output directory exists
    os.makedirs(output_dir, exist_ok=True)

    try:
        # Sniff traffic on all interfaces
        sniff(prn=packet_callback, count=100)

    except Exception as e:
        print(f"Error during sniffing: {e}")
    finally:
        # Get end time for file naming
        end_time = datetime.now().strftime("%Y%m%d_%H%M%S")
        final_pcap_file = f"{pcap_file}{end_time}.pcap"

        # Save packets to JSON
        with open(output_file, "w") as file:
            json.dump(packets, file, indent=4)
        print(f"JSON data saved to {output_file}")

        # Save packets to PCAP
        wrpcap(final_pcap_file, all_sniffed_packets)
        print(f"PCAP file saved to {final_pcap_file}")

if __name__ == "__main__":
    process_and_save_packets()
