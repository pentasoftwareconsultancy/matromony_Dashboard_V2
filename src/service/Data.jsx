const Data = {
    // Navbar Text Data
    navbar: {
        welcomeMessage: 'Welcome, Admin!',
        // profileName: 'Admin',
        notifications: 'Notifications',
        mails: 'Mails',
        searchPlaceholder: 'Search...',
        theme: {
            lightMode: 'Light Mode',
            darkMode: 'Dark Mode',
            backgroundOptions: 'Backgrounds',
            nature: 'Nature',
            abstract: 'Abstract',
            space: 'Space',
        },
    },
    // Notifications (added dynamic structure for notifications)
    notifications: [
        { message: 'New user "JohnDoe" signed up.', time: '2 minutes ago' },
        { message: 'Order #1245 has been shipped.', time: '30 minutes ago' },
        { message: 'New payment of $500 received.', time: '1 hour ago' },
        { message: 'Product "Laptop B" is out of stock.', time: '2 hours ago' },
    ],

    // Mail Data (added placeholders for mail-related data)
    mails: [
        { subject: 'Product "Phone A" available for re-stock', sender: 'admin@ecommerce.com', time: '1 day ago' },
        { subject: 'Payment confirmation for Order #1245', sender: 'payments@ecommerce.com', time: '2 days ago' },
        { subject: 'Welcome to the platform!', sender: 'support@ecommerce.com', time: '3 days ago' },
        { subject: 'Reminder: Product catalog update needed', sender: 'inventory@ecommerce.com', time: '4 days ago' },
    ],

    // Navigation Data (used for navigation items)
    NavData: [
        { to: '/dashboard', label: 'Dashboard', icon: 'FiHome' },
        { to: '/customer', label: 'Customer', icon: 'FiUser' },
        { to: '/categories', label: 'Categories', icon: 'FiList' },
        { to: '/products', label: 'Products', icon: 'FiBox' },
        { to: '/payments', label: 'Payments', icon: 'FiShoppingCart' },
        { to: '/orders', label: 'Orders', icon: 'FiShoppingCart' },
        { to: '/analytics', label: 'Analytics', icon: 'FiBarChart2' },
        { to: '/mails', label: 'Mails', icon: 'FiMail' },
        { to: '/settings', label: 'Settings', icon: 'FiSettings' },
        { to: '/logout', label: 'Logout', icon: 'FiLogOut' },
    ],

    // Theme-related data for easy customization
    themeOptions: {
        light: 'light',
        dark: 'dark',
        nature: 'nature',
        abstract: 'abstract',
        space: 'space',
    },

    // Dynamic Headings Data for the Dashboard
    header: {
        title: 'Dashboard',
        welcomeMessage: "Welcome back, Admin! Here's an overview of your system's activity.",
    },

    // Stats for the Dashboard
    stats: {
        totalProducts: 150,
        ordersToday: 75,
        pendingDeliveries: 50,
        registeredUsers: 200,
        totalRevenue: 12000, // Added total revenue stat
    },

    // Chart Data (Sales Overview)
    chartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Sales Overview',
                data: [65, 59, 80, 81, 56, 55],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.4, // Curved line
            },
        ],
    },

    // Chart Data (Order Trends)
    orderTrendsData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Order Trends',
                data: [40, 60, 70, 55, 90, 75],
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                fill: true,
                tension: 0.4, // Curved line
            },
        ],
    },

    // Recent Activities
    recentActivities: [
        'Order #1234 was placed by User1.',
        'Product "Phone A" was added to the catalog.',
        'User2 signed up for the platform.',
        'Order #1233 was delivered successfully.',
        'User3 updated their profile information.', // Added a new recent activity
    ],

    // Section Titles for Dashboard Cards
    statsHeadings: {
        totalProducts: 'Total Products',
        ordersToday: 'Orders Today',
        pendingDeliveries: 'Pending Deliveries',
        registeredUsers: 'Registered Users',
        totalRevenue: 'Total Revenue', // Added total revenue heading
    },

    // Chart Section Titles
    chartHeadings: {
        salesOverview: 'Sales Overview',
        orderTrends: 'Order Trends',
    },

    // Recent Activity Section Title
    recentActivityHeading: 'Recent Activity',

};

export default Data;
