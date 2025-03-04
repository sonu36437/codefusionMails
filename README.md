# Email Service API

This project provides an Express-based API for sending emails and storing email data in a MongoDB database. It includes endpoints for sending emails and retrieving stored emails by date.

## Features
- Send emails using **Nodemailer** (Gmail SMTP)
- Store email details in **MongoDB**
- Retrieve stored emails by date

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/email-service.git
   cd email-service
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```env
   APP_EMAIL=your-email@gmail.com
   APP_EMAIL_PASSWORD=your-email-password
   CONNECTION_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<databaseName>?retryWrites=true&w=majority
   ```
4. Start the server:
   ```sh
   node server.js
   ```

## API Endpoints

### **1. Send Email**
- **Endpoint:** `POST /send-email`
- **Description:** Sends an email and saves email data in MongoDB.
- **Request Body:**
  ```json
  {
    "email": "recipient@example.com",
    "name": "John Doe",
    "text": "Hello, this is a test email.",
    "phone_number": "1234567890"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Email sent successfully"
  }
  ```
- **Error Responses:**
  - `400` if any required fields are missing
  - `500` if email sending fails

### **2. Get Emails by Date**
- **Endpoint:** `GET /get-mails/:date`
- **Description:** Retrieves emails sent on a specific date.
- **URL Parameter:** `date` (format: `YYYY-MM-DD`)
- **Response:**
  ```json
  [
    {
      "_id": "65e5699f1a07f3d78c123456",
      "email": "recipient@example.com",
      "name": "John Doe",
      "message": "Hello, this is a test email.",
      "phone_number": "1234567890",
      "createdAt": "2024-03-04T10:30:00.000Z"
    }
  ]
  ```



