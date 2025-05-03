import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../user-role.enum';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @Column({ nullable: false })
  password: string;
  @Column({ nullable: false, unique: true })
  email: string;
  @Column({ nullable: false, unique: true })
  username: string;
  @Column({ default: UserRole.user })
  role: UserRole;
  @Column({ nullable: true, select: false })
  refreshToken: string;
  @Column({ default: true })
  isActive: boolean;
}
