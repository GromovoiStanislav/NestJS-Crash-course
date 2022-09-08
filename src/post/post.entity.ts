import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'Posts' })
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column()
  userName: string;
}
