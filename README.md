# Next-Admin

Next-Admin is a Next.js frontend application inspired by tools like Rails Admin. It provides an intuitive interface for managing Devise-based users in Rails applications. With plans to expand its functionality, Next-Admin aims to become a comprehensive CRUD and admin panel solution for Rails-powered backends.

## Features

### User Management

Manage Devise users seamlessly with a modern, user-friendly interface:
* List all users
* Add new users
* Edit existing users
* Delete users

### Future Enhancements

* **Custom User Management**: Support for non-Devise users and custom user models (currently under development).
* **CRUD Functionality**: Full Rails Admin-like CRUD support for managing data directly from the frontend.

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:
* Node.js (16.x or later recommended)
* npm, yarn, pnpm, or bun for package management.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/next-admin.git
   cd next-admin
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

### Running the Development Server

Start the development server with the following command:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Once started, open http://localhost:3000 in your browser to see the app in action.

## Development

### File Structure
* `app/`: Contains the main Next.js application files.
* `context/`: Context files for managing application state (e.g., server context).
* `components/`: Reusable UI components.
* `utils/`: Utility functions for APIs and IndexedDB interactions.

### Key Functionalities

#### User Management
* **Devise Users**: All CRUD operations for Devise-managed user types.
* **API Integration**: Works seamlessly with a Rails backend using APIs like `/user_types` and dynamic CRUD routes.

#### CRUD for Rails Models (Planned)
* A Rails Admin-like interface for managing all models dynamically from the Next.js frontend.
* Dynamic form generation and table views for Rails models.

### Environment Variables

Ensure the following environment variables are configured:
* `NEXT_PUBLIC_BASE_URL`: The base URL of your Rails API.

You can set these variables in a `.env.local` file:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Learn More

To learn more about the frameworks and tools used in this project, check out the following resources:
* Next.js Documentation
* Devise Gem Documentation
* Rails Admin

## Deployment

Deploy your app on Vercel for seamless hosting and integration with Next.js.
Refer to the Next.js Deployment Documentation for additional details.

## Contributing

We welcome contributions to improve Next-Admin. Whether it's fixing bugs, improving documentation, or adding new features, your input is valuable!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature-name'`
4. Push to your branch: `git push origin feature-name`
5. Open a pull request

## License

This project is licensed under the MIT License.
