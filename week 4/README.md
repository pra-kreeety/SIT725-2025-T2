# SIT 725 Week 4 - Database Integration

This project demonstrates the integration of MongoDB database with a Node.js/Express server for a dog adoption website.

## Features

- **MongoDB Integration**: Uses MongoDB with Mongoose for data persistence
- **REST API**: Provides endpoints to fetch dog data from the database
- **Dynamic Content**: Dog cards are now loaded from the database instead of static arrays
- **Database Seeding**: Includes functionality to populate the database with sample data

## Prerequisites

- Node.js installed
- MongoDB installed and running locally

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

## MongoDB Setup

### On Windows:
1. Download MongoDB from https://www.mongodb.com/try/download/community
2. Install MongoDB as a Windows Service
3. Check if running: Open Command Prompt and type `services.msc`
4. Look for MongoDB in the list of services and ensure status is "Running"

### On Mac:
1. Install MongoDB:
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community
   ```
2. Start MongoDB:
   ```bash
   brew services start mongodb/brew/mongodb-community
   ```
3. Check if running:
   ```bash
   brew services list
   ```

## Database Seeding

To populate the database with sample dog data, you can either:

1. **Use the seed script**:
   ```bash
   node seed.js
   ```

2. **Use the API endpoint**:
   Start the server and visit: `http://localhost:3000/api/seed`

## Running the Application

1. Start the server:
   ```bash
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

- `GET /api/dogs` - Retrieves all dogs from the database
- `GET /api/seed` - Seeds the database with sample data (development only)

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: HTML5, CSS3, JavaScript (jQuery), Materialize CSS
- **Package Management**: npm

## Database Schema

The Dog schema includes:
- `title`: String (Dog name)
- `image`: String (Image path)
- `link`: String (Action link text)
- `description`: String (Dog description)
- `breed`: String (Dog breed)
- `age`: String (Dog age)
- `weight`: String (Dog weight)
- `temperament`: String (Dog temperament)

## File Structure

```
├── package.json
├── server.js          # Main server file with MongoDB integration
├── seed.js           # Database seeding script
├── README.md
└── public/
    ├── index.html
    ├── css/
    │   └── styles.css
    ├── images/
    │   ├── dog-1.jpg
    │   ├── dog-2.png
    │   ├── dog-3.jpeg
    │   ├── hero.png
    │   └── main.png
    └── js/
        └── scripts.js  # Updated to fetch data from API
```

## Changes from Week 3

1. **Package.json**: Updated name and description for Week 4
2. **Server.js**: 
   - Added MongoDB connection with Mongoose
   - Implemented Dog schema and model
   - Added REST API endpoints for fetching dog data
   - Added database seeding functionality
3. **Scripts.js**: 
   - Removed static card data
   - Added `getDogs()` function to fetch data from server
   - Updated card rendering to use server data
4. **New Files**:
   - `seed.js` for database population
   - Updated `README.md` for Week 4

## Troubleshooting

- **MongoDB Connection Error**: Ensure MongoDB is running locally
- **Port Issues**: Default port is 3000, change in server.js if needed
- **Missing Data**: Run the seed script or visit `/api/seed` endpoint

## Next Steps

Future enhancements could include:
- Add dog creation/editing functionality
- Implement user authentication
- Add adoption request handling
- Deploy to cloud platforms (MongoDB Atlas, Heroku, etc.)
