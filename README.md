# GraphQL Crash Course

This project is a **GraphQL API** built using **TypeScript**, **TypeORM**, and **Apollo Server**. It demonstrates a simple setup for managing games, reviews, and authors with bi-directional relationships. The server supports live-reloading during development.

---

## Features

- **GraphQL** for querying and mutating data.
- **TypeORM** for database management and relationships.
- **Type-GraphQL** for building the GraphQL schema.
- **PostgreSQL** as the database.
- **dotenv** for environment variable management.
- **Live-reloading** using `nodemon`.

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [PostgreSQL](https://www.postgresql.org/) (Ensure the database server is running)
- A package manager like `npm` or `yarn`

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo/graphql-project.git
cd graphql-project
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
# Server
PORT=4000

# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your_username
DATABASE_PASSWORD=your_password
DATABASE_NAME=graphql_crash_course
```

### 4. Run the Database Migration (Optional)

If using `synchronize: false` in `orm.config.ts`, run the following to apply migrations:

```bash
npm run typeorm migration:run
```

### 5. Start the Development Server

For live-reloading:

```bash
npm run dev
```

To start without live-reloading:

```bash
npm run start
```

The server will be available at [http://localhost:4000](http://localhost:4000).

---

## Scripts

### Development

```bash
npm run dev
```

Starts the server with live-reloading using `ts-node-dev`.

### Production

```bash
npm run build
npm run start
```

Builds the TypeScript code and starts the compiled server.

### TypeORM Commands

```bash
npm run typeorm migration:generate --name MigrationName
npm run typeorm migration:run
npm run typeorm migration:revert
```

Manages database migrations.

---

## Usage

### Example Queries and Mutations

#### Fetch Games with Reviews

```graphql
query {
  games {
    id
    title
    platform
    reviews {
      id
      name
      rating
      author {
        id
        name
      }
    }
  }
}
```

#### Create a Game

```graphql
mutation {
  createGame(title: "The Witcher 3", platform: ["PC", "PS5"]) {
    id
    title
    platform
  }
}
```

#### Create a Review with Game and Author

```graphql
mutation {
  createReview(rating: 4.8, name: "Fantastic Game!", gameId: 1, authorId: 2) {
    id
    name
    rating
    game {
      id
      title
    }
    author {
      id
      name
    }
  }
}
```

#### Fetch Authors with Reviews

```graphql
query {
  authors {
    id
    name
    verified
    reviews {
      id
      name
      rating
      game {
        id
        title
      }
    }
  }
}
```

---

## Project Structure

```
.
├── src/
│   ├── entities/        # Database entities
│   ├── resolvers/       # GraphQL resolvers
│   ├── ormconfig.ts     # TypeORM configuration
│   └── main.ts          # Entry point
├── .env                 # Environment variables
├── tsconfig.json        # TypeScript configuration
└── package.json         # npm scripts and dependencies
```

---

## Technologies Used

- **Node.js**
- **TypeScript**
- **Apollo Server**
- **GraphQL**
- **TypeORM**
- **PostgreSQL**

---

## License

This project is licensed under the MIT License.

---

## Contributing

Feel free to fork this repository and submit pull requests for any enhancements or bug fixes!
