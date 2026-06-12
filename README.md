# Custom Node.js Static File Server

A lightweight, native Node.js backend server built completely from scratch without external frameworks like Express. This project demonstrates backend routing, custom MIME type mapping, and proper binary file streaming for web assets like styles and images.

---

## Project Demo Video

(https://github.com/user-attachments/assets/a28dc8b5-0fbf-431d-ba4a-44232f4530b0)

---

## Key Features Built
- **Pure Node.js Architecture:** Built using native `http`, `fs`, and `path` core modules.
- **Binary Image Handling:** Safely streams binary files (`.webp`, `.jpg`, `.png`) alongside text assets without data corruption.
- **Case-Insensitive File Extensions:** Normalizes routing paths to handle uppercase or lowercase extensions flawlessly.
- **Terminal Request Logs:** Displays live backend activity strings in the console every time a page or image is requested.

## How to Run the Server Locally

Follow these steps to boot up this backend on your local computer:

1. **Clone the repository:**
   ```bash
   git clone: (https://github.com/bhumi-patre08/MyServer.git)
Navigate into the project directory:

2. Bash
cd myserver
Start the local server process:

3. Bash
node server.js

4. View the website:
Open your browser and navigate to http://localhost:3000 or http://localhost:3000/about.
