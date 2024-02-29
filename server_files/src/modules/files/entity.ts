import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('files')
export default class FilesEntity {
  @PrimaryGeneratedColumn("uuid")
  file_id: string;

  @Column({ type: 'varchar' })
  entity: string;

  @Column({ type: 'varchar' })
  location: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  url: string;
}