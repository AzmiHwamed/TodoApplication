import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity('Task')
export class Task {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;
    @ApiProperty()
    @Column({name: 'title'})
    title: string;
    @ApiProperty()
    @Column({name: 'description'})
    description: string;
    @ApiProperty()
    @Column({name: 'status'})
    status: boolean;
    @ApiProperty()
    @Column( {name: 'priority'})
    priority: string;
    @ApiProperty()
    @Column( {name: 'createdAt'})
    createdAt: Date;
    @ManyToOne(() => User, (user) => user.tasks)
    user: User;
}
