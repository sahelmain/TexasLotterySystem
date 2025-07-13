# Texas Lottery System

A comprehensive React-based lottery system that simulates the Texas lottery experience with realistic lottery mechanics, user authentication, ticket purchasing, and administrative features.

## Features

### User Features
- **User Authentication**: Secure login and registration system
- **Lottery Ticket Browsing**: View and purchase different types of lottery tickets
- **Ticket Purchasing**: Buy tickets for various lottery games
- **Order History**: View purchased tickets and check winning status
- **Win Checking**: Automatic comparison of user tickets against winning numbers
- **Previous Winning Numbers**: View historical winning numbers

### Admin Features
- **Winning Number Generation**: Generate realistic winning numbers for all lottery types
- **Ticket Management**: Add and manage custom lottery tickets
- **Number Storage**: Store winning numbers in backend database

### Supported Lottery Types
1. **Powerball**: 5 white balls (1-69) + 1 Powerball (1-26)
2. **Mega Millions**: 5 white balls (1-70) + 1 Mega Ball (1-25)
3. **Lotto Texas**: 6 balls (1-54)
4. **Texas Two Step**: 4 white balls (1-35) + 1 bonus ball (1-35)

## Tech Stack

### Frontend
- **React**: Main framework
- **React Router**: Navigation and routing
- **Bootstrap**: Modern UI styling
- **CSS**: Custom styling

### Backend (Required)
- **Node.js**: Server runtime
- **Express.js**: Web framework
- **JWT**: Authentication tokens
- **Database**: For storing user data, tickets, and winning numbers

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend server running on `localhost:3080`

### Setup
1. Clone the repository:
```bash
git clone https://github.com/sahelmain/TexasLotterySystem.git
cd TexasLotterySystem
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

### For Users
1. **Login/Register**: Create an account or login with existing credentials
2. **Browse Tickets**: Navigate to "Browse Lottery Tickets" to view available games
3. **Purchase Tickets**: Select a lottery type and generate/purchase tickets
4. **Check Results**: View your order history to see if you've won
5. **View Previous Numbers**: Check historical winning numbers

### For Admins
1. **Access Admin Panel**: Navigate to the admin section
2. **Generate Winning Numbers**: Click to generate new winning numbers for all lottery types
3. **Manage Tickets**: Add custom lottery tickets through the management interface

## API Endpoints

The frontend expects the following backend endpoints:

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Tickets
- `POST /purchase-ticket` - Purchase a lottery ticket
- `POST /get-user-tickets` - Get user's purchased tickets

### Winning Numbers
- `POST /store-winning-numbers` - Store generated winning numbers
- `GET /get-winning-numbers` - Get current winning numbers
- `GET /get-previous-winnings` - Get historical winning numbers

## Project Structure

```
TexasLotterySystem/
├── public/
├── src/
│   ├── Admin.js                 # Admin panel for generating winning numbers
│   ├── App.js                   # Main app component with routing
│   ├── Home.js                  # Home page with navigation
│   ├── Login.js                 # Login/registration component
│   ├── browse_lottery_tickets.js # Ticket browsing and purchasing
│   ├── ManageTickets.js         # Admin ticket management
│   ├── orderHistory.js          # User order history with win checking
│   ├── prevNumbers.js           # Previous winning numbers display
│   ├── App.css                  # App-specific styles
│   ├── Home.css                 # Home page styles
│   ├── Login.css                # Login page styles
│   ├── style.css                # Global styles
│   └── index.js                 # App entry point
├── package.json
└── README.md
```

## Key Components

### Admin.js
- Generates realistic lottery numbers for all supported games
- Stores winning numbers in backend database
- Displays current winning numbers

### orderHistory.js
- Fetches user's purchased tickets
- Compares tickets against winning numbers
- Displays win/loss status for each ticket

### browse_lottery_tickets.js
- Displays available lottery games
- Allows users to generate and purchase tickets
- Integrates with backend for ticket storage

### prevNumbers.js
- Fetches and displays historical winning numbers
- Updates dynamically from backend data

## Development

### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
```

### Code Style
- Follow React best practices
- Use functional components with hooks
- Maintain consistent naming conventions

## Backend Requirements

The application requires a Node.js backend server with the following features:
- JWT-based authentication
- User registration and login
- Ticket purchase and storage
- Winning number generation and storage
- Database integration for persistence

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

This project is for educational purposes as part of CS3365 coursework.

## Contact

For questions or support, please contact: saazzam@ttu.edu

## Acknowledgments

- Texas Tech University CS3365 Course
- React Documentation
- Bootstrap UI Framework 