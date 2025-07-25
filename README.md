# Texas Lottery System

A comprehensive React-based lottery system that simulates the Texas lottery experience with realistic lottery mechanics, user authentication, ticket purchasing, and administrative features. The application features a professional business-appropriate design with modern UI components and complete offline functionality.

## Features

### User Features
- **Mock Authentication**: Simple login system (any email/password for users, admin@test.com for admin)
- **Lottery Ticket Browsing**: View and purchase different types of lottery tickets
- **Multi-Ticket Purchase**: Buy multiple tickets at once with bulk discounts (up to 50 tickets)
- **Favorite Numbers**: Save and manage your lucky numbers for easy reuse
- **Order History**: View purchased tickets and check winning status automatically
- **Lottery Statistics**: Comprehensive analytics dashboard with performance insights
- **Win Checking**: Automatic comparison of user tickets against winning numbers
- **Previous Winning Numbers**: View current winning numbers generated by admin

### Admin Features
- **Winning Number Generation**: Generate realistic winning numbers for all lottery types
- **Ticket Management**: Add and manage custom lottery tickets
- **Number Storage**: Store winning numbers in localStorage for persistence

### Supported Lottery Types
1. **Powerball**: 5 white balls (1-69) + 1 Powerball (1-26)
2. **Mega Millions**: 5 white balls (1-70) + 1 Mega Ball (1-25)
3. **Lotto Texas**: 6 balls (1-54)
4. **Texas Two Step**: 4 white balls (1-35) + 1 bonus ball (1-35)

## Tech Stack

### Frontend
- **React**: Main framework with hooks
- **React Router**: Navigation and routing
- **Bootstrap 5**: Modern UI styling and components
- **CSS**: Custom professional styling with glassmorphism effects
- **localStorage**: Data persistence for offline functionality

### Design Features
- **Professional Theme**: Clean blues and grays with subtle animations
- **Glassmorphism Effects**: Modern frosted glass appearance
- **Responsive Design**: Works on all screen sizes
- **Modern Typography**: Inter font with proper hierarchy
- **Smooth Animations**: Hover effects and transitions

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

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

### Authentication
- **Regular Users**: Login with any email and password combination
- **Admin Access**: Use `admin@test.com` as email with any password

### For Users
1. **Login**: Enter any email and password to access the system
2. **Browse Tickets**: Navigate to "Browse Lottery Tickets" to view available games
3. **Purchase Tickets**: Select a lottery type and click "Buy Ticket" to get random numbers
4. **Multi-Purchase**: Use "Multi-Ticket Purchase" to buy multiple tickets with bulk discounts
5. **Save Favorites**: Create and manage your favorite number combinations
6. **View Statistics**: Access detailed analytics about your lottery playing patterns
7. **Check Results**: View your order history to see win/loss status
8. **View Previous Numbers**: Check current winning numbers (if generated by admin)

### For Admins
1. **Access Admin Panel**: Login with `admin@test.com` to access admin features
2. **Generate Winning Numbers**: Click to generate new winning numbers for all lottery types
3. **Manage System**: Numbers are stored and used for win checking

## Data Storage

The application uses localStorage for data persistence:
- **User Tickets**: Stored in `userTickets` key
- **Favorite Numbers**: Stored in `userFavorites` key
- **Winning Numbers**: Stored in `winningNumbers` key
- **Session Data**: User email stored in sessionStorage

## Project Structure

```
TexasLotterySystem/
├── public/
│   └── index.html               # Main HTML file
├── src/
│   ├── Admin.js                 # Admin panel for generating winning numbers
│   ├── App.js                   # Main app component with routing
│   ├── Home.js                  # Home page with navigation
│   ├── Login.js                 # Login/registration component
│   ├── browse_lottery_tickets.js # Ticket browsing and purchasing
│   ├── MultiTicketPurchase.js   # Bulk ticket purchasing with discounts
│   ├── TicketFavorites.js       # Favorite numbers management
│   ├── LotteryStats.js          # Statistics and analytics dashboard
│   ├── ManageTickets.js         # Admin ticket management
│   ├── orderHistory.js          # User order history with win checking
│   ├── prevNumbers.js           # Previous winning numbers display
│   ├── App.css                  # App-specific styles
│   ├── Home.css                 # Home page professional styling
│   ├── Login.css                # Login page professional styling
│   ├── style.css                # Global professional styles
│   └── index.js                 # App entry point
├── package.json
└── README.md
```

## Key Components

### Admin.js
- Generates realistic lottery numbers for all supported games
- Stores winning numbers in localStorage
- Displays current winning numbers with professional styling

### orderHistory.js
- Fetches user's purchased tickets from localStorage
- Simulates win checking with random results (10% win rate)
- Displays win/loss status for each ticket with statistics

### browse_lottery_tickets.js
- Displays available lottery games with professional cards
- Allows users to generate and purchase tickets
- Stores tickets in localStorage for persistence

### prevNumbers.js
- Fetches and displays current winning numbers
- Updates dynamically from localStorage data
- Shows game information and descriptions

### Login.js
- Mock authentication system for testing
- Professional split-screen design
- Handles both user and admin access

## Mock System Details

Since this is a demonstration application, it uses mock systems:
- **Authentication**: Any email/password works for users, `admin@test.com` for admin
- **Win Checking**: Random 10% win rate for demonstration
- **Data Storage**: localStorage instead of database
- **Real-time Updates**: Simulated through localStorage changes

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
- Professional React patterns with functional components and hooks
- Modern CSS with glassmorphism and smooth animations
- Responsive design principles
- Clean, maintainable code structure

## Design Philosophy

The application features a professional business-appropriate design:
- **Clean Color Palette**: Blues, grays, and whites for professional appearance
- **Subtle Animations**: Smooth transitions without being distracting
- **Modern UI**: Glassmorphism effects and clean typography
- **Responsive**: Works seamlessly across all devices
- **Accessible**: Proper contrast ratios and readable fonts

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

This project is for educational purposes as part of CS3365 coursework at Texas Tech University.

## Contact

For questions or support, please contact: saazzam@ttu.edu

## Acknowledgments

- Texas Tech University CS3365 Course
- React Documentation
- Bootstrap 5 UI Framework
- Inter Font by Google Fonts 