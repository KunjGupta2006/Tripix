# Tripix: Travel Memory Sharing Platform

[![GitHub stars](https://img.shields.io/github/stars/KunjGupta2006/Tripix?style=flat-square)](https://github.com/KunjGupta2006/Tripix/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/KunjGupta2006/Tripix?style=flat-square)](https://github.com/KunjGupta2006/Tripix/network/members)
[![GitHub issues](https://img.shields.io/github/issues/KunjGupta2006/Tripix?style=flat-square)](https://github.com/KunjGupta2006/Tripix/issues)
[![License](https://img.shields.io/badge/License-Unspecified-lightgrey?style=flat-square)](https://github.com/KunjGupta2006/Tripix/blob/main/LICENSE)


## 📸 Tripix: Discover & Share Travel Memories
Tripix is a dynamic, user-centric web platform designed for the modern traveler to capture, share, and explore stunning travel memories from around the globe.

## Key Features

* ✨ **Full CRUD Operations:** Users can create, view, update, and delete their travel listings (Memories).
* 🗺️ **Interactive Listings:** View all shared memories on the main feed with location details.
* 🔒 **Authentication:** Secure user registration and login implemented using **Passport.js**.
* 💬 **Comments:** Users can leave comments and feedback on listings.
* 🏷️ **Category & Location Tagging:** Easily categorize and tag listings for better searchability.
* 🗺️ **Listings Location(Under Development):** The feature to display listings on an interactive map using **Leaflet.js** is currently being added.

## Setup and Usage

### Prerequisites

You need the following software installed locally:

* Node.js (v18 or higher)
* npm (v8 or higher)
* MongoDB (local instance or access to a cloud cluster like MongoDB Atlas).

### Installation

Follow these steps to set up the project on your machine:

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/KunjGupta2006/Tripix.git](https://github.com/KunjGupta2006/Tripix.git)
    cd Tripix
    ```

2.  **Install server dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables (CRITICAL):**
    Create a `.env` file in the root directory and define the following variables for your database connection and session secret:

    ```env
    DB_URL="<Your MongoDB Connection String>"
    SECRET="<A long, complex string for session secret>"
    ```

### Usage Example

To start the Tripix application and run the Express server:

```bash
node app.js
```

This will typically launch a local web server, and you can access Tripix through your browser.

## Technical Details and Maintenance

### Project Structure

The project follows a modular and scalable structure, common for modern JavaScript applications:

```
Tripix/
├── controllers/          # Business logic and route handlers
├── models/               # Mongoose schemas for MongoDB
├── public/               # Client-side assets (CSS, JS, images)
│   ├── css/
│   ├── js/
│   └── images/
├── routes/               # Express routing files (listings, users, reviews)
├── utils/                # Utility middleware (e.g., error handling, validation)
├── views/                # EJS Template files for rendering UI
│   ├── includes/         # Headers, footers, etc.
│   └── listings/         # Specific listing views
├── seed/                 # Database seeding script
├── app.js                # Main Express application entry file
├── package.json          # Dependencies and scripts
└── .env.example          # Example environment variables
```

### Built With (Tech Stack)

*  **Node.js: Server-side runtime environment.
*  **Express.js: Web framework for routing and middleware.
*  **MongoDB/Mongoose: Database and Object Data Modeling (ODM) library.
*  **EJS (Embedded JavaScript): Templating engine for server-side rendered views.
*  **Passport.js: Authentication middleware for handling user sessions.
*  **Bootstrap/CSS: Frontend styling and responsive layout.
*  **Leaflet.js:** An open-source JavaScript library for mobile-friendly interactive maps.


Distributed under the Unspecified license. See `LICENSE` for more information.

### Contact

KunjGupta2006 - [GitHub Profile](https://github.com/KunjGupta2006)

Project Live Link: [https://Tripix.onrender.com/listings](https://Tripix.onrender.com/listings)

For bug reports, feature requests, or general inquiries, please [open an issue](https://github.com/KunjGupta2006/Tripix/issues) on GitHub.
