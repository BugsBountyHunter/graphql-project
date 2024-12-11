import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Review } from "../entities/review.entity";
import { AppDataSource } from "../config/orm.config";
import { Game } from "../entities/game.entitiy";
import { Author } from "../entities/author.entity";

@Resolver()
export class ReviewResolver {
  private reviewRepository = AppDataSource.getRepository(Review);
  private gameRepository = AppDataSource.getRepository(Game);
  private authorRepository = AppDataSource.getRepository(Author);

  @Query(() => [Review])
  reviews(): Promise<Review[]> {
    return this.reviewRepository.find({
      relations: { game: true, author: true },
    });
  }

  @Mutation(() => Review)
  async createReview(
    @Arg("rating") rating: number,
    @Arg("name") name: string,
    @Arg("gameId") gameId: string,
    @Arg("authorId") authorId: string
  ): Promise<Review> {
    const game = await this.gameRepository.findOneBy({ id: gameId });
    if (!game) {
      throw new Error("Game not found");
    }

    const author = await this.authorRepository.findOneBy({ id: authorId });
    if (!author) {
      throw new Error("Author not found");
    }

    const review = this.reviewRepository.create({ rating, name, game, author });
    return this.reviewRepository.save(review);
  }
}
