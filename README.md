# Mona's Hostel Management System

A responsive hostel-management starter website built with HTML, CSS, JavaScript, Express and MySQL.

## Features
- Dashboard with resident, check-in, fee-pending and assigned-room counts
- Insert resident records
- List and search/filter residents
- Find a resident by ID
- Update resident, room, check-in/out and fee information
- Remove a resident record with confirmation
- Room and fee workflow guide

## Requirements
- Node.js and npm
- MySQL Server

## Setup on macOS
1. Open Terminal and `cd` into this project folder.
2. Install packages: `npm install`
3. Start MySQL and run the SQL file in a MySQL client, for example:
   `mysql -u root -p < schema.sql`
4. If your MySQL root account has a password, set it before starting the server:
   `export DB_PASSWORD='your_mysql_password'`
   Optional variables: `DB_HOST`, `DB_USER`, `DB_NAME`.
5. Start the website: `npm start`
6. Open `http://localhost:3000` in your browser.

The default DB settings are host `localhost`, user `root`, empty password, database `monas_hostel`. Change these using environment variables if needed.

## Important
The website needs the included Express server and MySQL database to perform CRUD operations. Opening the HTML files directly with Finder will not connect to the API. This starter does not implement authentication, actual room-capacity/availability checks, or payment-gateway processing.
