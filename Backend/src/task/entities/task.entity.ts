import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity('Task')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({name: 'title'})
    title: string;
    @Column({name: 'description'})
    description: string;
    @Column({name: 'status'})
    status: boolean;
    @Column( {name: 'priority'})
    priority: string;
    @ManyToOne(() => User, (user) => user.tasks)
    user: User;
}
