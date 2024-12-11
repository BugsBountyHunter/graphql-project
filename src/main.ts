import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { GameResolver } from "./resolvers/game.resolver";
import { ReviewResolver } from "./resolvers/review.resolver";
import { AuthorResolver } from "./resolvers/author.resolver";
import { AppDataSource } from "./config/orm.config";

async function bootstrap() {
  // init the database
  await AppDataSource.initialize();

  // build the GraphQL Schema
  const schema = await buildSchema({
    resolvers: [GameResolver, ReviewResolver, AuthorResolver],
  });

  // start apollo server
  const server = new ApolloServer({ schema });

  const port = process.env.PORT || 4000;
  server.listen({ port: port }, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
}

bootstrap();
