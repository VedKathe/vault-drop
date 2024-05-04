
# VaultDrop

VaultDrop is a web application designed to enhance the way users upload, store, and access their files in the cloud. Utilizing a powerful combination of React and Express technologies, VaultDrop delivers a secure and intuitive platform for managing files with top-tier security measures.


## Key Features


### PIN-Protected Downloads
- **Unique PIN for Each File**: Every file uploaded is protected by a unique PIN that ensures only authorized users can access the file.
- **Shareable Security**: Users can share files securely by providing the PIN to intended recipients without compromising the file's security.

### User-Friendly Interface
- **Sleek Design**: The interface is clean and modern, designed to ensure ease of use without a steep learning curve.
- **Intuitive Navigation**: Users can easily find and manage their files with minimal clicks, enhancing the user experience.

### Cross-Platform Accessibility
- **Responsive Design**: The application is fully responsive, providing a consistent experience across all devices including desktops, tablets, and smartphones.
- **Multi-Platform Compatibility**: Whether on Windows, macOS, iOS, or Android, VaultDrop works seamlessly, ensuring users can access their files from anywhere.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before running the project, you must have the following installed:
- Node.js
- npm (usually comes with Node.js)
- Git (optional, if you clone the repository)

### Installation

First, clone the repository to your local machine using Git, or download the ZIP file and extract it.

```bash
git clone https://github.com/VedKathe/vault-drop.git
cd vault-drop
```

### Setting up the Server
Navigate to the server directory and install the necessary dependencies.

```bash
cd server
npm install
```

Create a new directory named uploads within the server folder to store uploaded files.

```bash
mkdir uploads
```
Start the server by running:

```bash
npm start
```
The server will start running on http://localhost:4000.

### Setting up the Client
Open a new terminal window, navigate back to the root directory of your project, then go to the client directory.

```bash
cd ../client
npm install
```
Start the React development server by running:

```bash
npm start
```
This command will open http://localhost:3000 in your default web browser.

##Output
![photo-collage png](https://github.com/VedKathe/vault-drop/assets/96811754/27a2f2bb-8be2-4b5c-8233-e2c8b9f558a2)

- **Note**: Hover over to File icon to see download,delete options

