import { Field, Float, ID, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Game } from "./game.entitiy";
import { Author } from "./author.entity";

@ObjectType()
@Entity()
export class Review {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => Float)
  @Column({ type: "float" })
  rating!: number;

  @Field()
  @Column()
  name!: string;

  @Field(() => Game)
  @ManyToOne(() => Game, (game) => game.reviews, { cascade: true })
  @JoinColumn({ name: "game_id" })
  game!: Game;

  @Field(() => Author)
  @ManyToOne(() => Author, (author) => author.reviews, { cascade: true })
  @JoinColumn({ name: "author_id" })
  author!: Author;

  @Field()
  @CreateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    name: "created_at",
  })
  createdAt?: Date;

  @Field()
  @UpdateDateColumn({
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
    name: "updated_at",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt?: Date;

  @Field()
  @DeleteDateColumn({
    type: "timestamptz",
    nullable: true,
    name: "deleted_at",
  })
  deletedAt?: Date;
}
