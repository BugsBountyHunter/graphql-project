import { ObjectType, Field, ID } from "type-graphql";
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
export class Author {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  verified!: boolean;

  @Field(() => [Review])
  @OneToMany(() => Review, (review) => review.game)
  reviews!: Review[];

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
