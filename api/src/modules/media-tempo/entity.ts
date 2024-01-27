import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('media_files_tempo')
export class MediaFilesTempoEntity {
  @PrimaryGeneratedColumn("uuid")
  media_tempo_id: string;

  @Column()
  media: string;

  @Column()
  location: string;

}