import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()

export class UserEntity {

    @PrimaryColumn()
    guid: string

    @Column({ type: 'varchar', length: 255 })
    name: string

    @Column({ type: 'varchar', length: 255 })
    lastname: string

    @Column({ type: 'varchar', length: 255 })
    email: string

    @Column({ type: 'varchar', length: 255 })
    password: string

    @Column({ type: 'varchar', length: 255 })
    refreshToken: string

    @Column({ type: 'boolean', default: true })
    active: boolean

}