    import { Task } from 'src/task/entities/task.entity';
    import { Entity , PrimaryGeneratedColumn,OneToMany, Column, Unique} from 'typeorm';
    @Entity("user")
    export class User {
    @PrimaryGeneratedColumn()
    id : number;
    @Column({name:'username'})
    @Unique(['username'])
    username : string;

    @Column({name:'hashed_password'})
    hashedPassword : string;

    @Column({name:'refresh_tocken'})
    refreshTocken : string;

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[]

    }
