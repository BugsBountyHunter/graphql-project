import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Game } from "../entities/game.entitiy";
import { AppDataSource } from "../config/orm.config";

@Resolver()
export class GameResolver {
  private gameRepository = AppDataSource.getRepository(Game);

  @Query(() => [Game])
  async games(): Promise<Game[]> {
    return this.gameRepository.find({ relations: { reviews: true } });
  }

  @Mutation(() => Game)
  async createGame(
    @Arg("title") title: string,
    @Arg("platfrom", () => [String]) platform: string[]
  ): Promise<Game> {
    const game = this.gameRepository.create({ title, platform });
    return this.gameRepository.save(game);
  }
}
