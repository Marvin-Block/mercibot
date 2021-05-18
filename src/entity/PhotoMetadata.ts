import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Photo } from "./Photo";
/**
 * Here, we are using a new decorator called @OneToOne. 
 * It allows us to create a one-to-one relationship between two entities. type => Photo is a function that returns the class of the entity with which we want to make our relationship. 
 * We are forced to use a function that returns a class, instead of using the class directly, because of the language specifics. 
 * We can also write it as () => Photo, but we use type => Photo as a convention to increase code readability. The type variable itself does not contain anything.
 * We also add a @JoinColumn decorator, which indicates that this side of the relationship will own the relationship.
 * Relations can be unidirectional or bidirectional. Only one side of relational can be owning. 
 * Using @JoinColumn decorator is required on the owner side of the relationship.
 */
@Entity()
export class PhotoMetadata {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("int")
    height: number;

    @Column("int")
    width: number;

    @Column()
    orientation: string;

    @Column()
    compressed: boolean;

    @Column()
    comment: string;

    @OneToOne(type => Photo, photo => photo.metadata)
    @JoinColumn()
    photo: Photo;
}