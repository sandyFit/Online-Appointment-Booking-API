# Dental Studio Online Appointment Booking API

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Commands](#basic-commands)
  - [Advanced Usage](#advanced-usage)
- [Configuration](#configuration)
- [FAQ](#faq)
- [License](#license)

## Introduction
This API enables a dental studio to manage online appointment bookings efficiently. Doctors can see up to 12 patients in an 8-hour workday, with the flexibility to adjust patient load based on expertise and preferences.
This API is build with JavaScript, Node JS and express.

Key features:

- Schedule appointments.
- Manage doctor availability.
- Adjust appointment limits based on the doctor's specialization.
- Send notifications

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/dental-studio-api.git

2. Navigate to the project directory:
    `cd server`

3. Install dependencies:
    `npm install`

4. Set up environment variables: Create a .env file and add the necessary variables such as the database URL, port, etc.

5. Start the API:
    `npm run dev`

## Usage
### Basic API Endpoints
1. **Get Available Slots**
Returns available appointment slots for a specific date.

    - Endpoint: /appointments/available
    - Method: GET
    - Params:
    - date (required): The date to check availability (e.g., 2024   -10    -01).

2. **Book an Appointment**
Books an appointment for a patient.

    - Endpoint: /appointments/book
Method: POST
    - Params:
    - patient_name (required): Name of the patient.
    - doctor_id (required): ID of the doctor.
    - appointment_time (required): Desired time slot.

### Advanced Usage
- Adjust Doctor Workload: Modify the number of patients a doctor can see based on their specialty.
- Notification System: Notify patients of upcoming appointments via email or SMS.

## Configuration
To configure the system, edit the .env file with the following variables:

- PORT: The port the server should run on (default: 3000).
- DATABASE_URL: The URL for connecting to the PostgreSQL database.

## FAQ
How many appointments can a doctor have in a day?
- By default, doctors can see up to 12 patients in an 8 -hour workday, but this can be adjusted.<br>

Can patients cancel or reschedule appointments?
- Yes, endpoints are available for both cancellation and rescheduling.

## License
This project is licensed under the MIT License.


