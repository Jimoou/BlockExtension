import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class FileExtension {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20 })
  name: string;

  @Column({ nullable: true })
  status: string;

  @Column({ default: false })
  block: boolean;
}
