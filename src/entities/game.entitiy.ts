import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Review } from "./review.entity";

@ObjectType()
@Entity()
export class Game {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  title!: string;

  @Field(() => [String])
  @Column({ type: "simple-array" }) // store array as comma-seprated values
  platform!: string[];

  @Field(() => [Review])
  @OneToMany(() => Review, (review) => review.game)
  reviews!: Review[];

  // DateTime Columns
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
