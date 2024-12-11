import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Author } from "../entities/author.entity";
import { AppDataSource } from "../config/orm.config";

@Resolver()
export class AuthorResolver {
  private readonly authorRepositoty = AppDataSource.getRepository(Author);

  @Query(() => [Author])
  authors(): Promise<Author[]> {
    return this.authorRepositoty.find({ relations: { reviews: true } });
  }

  @Mutation(() => Author)
  async createAuthor(
    @Arg("name") name: string,
    @Arg("verified") verified: boolean
  ): Promise<Author> {
    const author = this.authorRepositoty.create({ name, verified });
    return this.authorRepositoty.save(author);
  }
}
