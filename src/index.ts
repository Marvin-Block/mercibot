import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import {Photo} from "./entity/Photo";
import {PhotoMetadata} from "./entity/PhotoMetadata";

createConnection().then(async connection => {

    //https://typeorm.io/#/

    /**
     * saving entries using repository
     */

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    const userRepository = connection.getRepository(User);
    await userRepository.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await userRepository.find();
    console.log("Loaded users: ", users);

    // let photo = new Photo();
    // const photoRepository = await connection.getRepository(Photo);
    // photo.name = "Me and Bears";
    // photo.description = "I am near polar bears";
    // photo.filename = "photo-with-bears.jpg";
    // photo.views = 1;
    // photo.isPublished = true;

    // await photoRepository.save(photo).then(photo => {
    //     console.log("Photo has been saved. Photo id is", photo.id);
    // });


    /**
     * querying entries
    */
    // let _allPhotos = await photoRepository.find();
    // console.log("All photos from the db: ", _allPhotos);

    // let firstPhoto = await photoRepository.findOne(1);
    // console.log("First photo from the db: ", firstPhoto);

    // let meAndBearsPhoto = await photoRepository.findOne({ name: "Me and Bears" });
    // console.log("Me and Bears photo from the db: ", meAndBearsPhoto);

    // let allViewedPhotos = await photoRepository.find({ views: 1 });
    // console.log("All viewed photos: ", allViewedPhotos);

    // let allPublishedPhotos = await photoRepository.find({ isPublished: true });
    // console.log("All published photos: ", allPublishedPhotos);

    // let [allPhotos, photosCount] = await photoRepository.findAndCount();
    // console.log("All photos: ", allPhotos);
    // console.log("Photos count: ", photosCount)

    /**
     * Updating one Entry
     */
    // let photoToUpdate = await photoRepository.findOne(1);
    // photoToUpdate.name = "Me, my friends and polar bears";
    // await photoRepository.save(photoToUpdate);

    // /**
    //  * removing entry
    //  */
    // let photoToRemove = await photoRepository.findOne(1);
    // await photoRepository.remove(photoToRemove);

    // create a photo
    let photo = new Photo();
    photo.name = "Me and Bears";
    photo.description = "I am near polar bears";
    photo.filename = "photo-with-bears.jpg";
    photo.isPublished = true;

    // create a photo metadata
    let metadata = new PhotoMetadata();
    metadata.height = 640;
    metadata.width = 480;
    metadata.compressed = true;
    metadata.comment = "cybershoot";
    metadata.orientation = "portrait";
    metadata.photo = photo; // this way we connect them

    // get entity repositories
    let photoRepository = connection.getRepository(Photo);
    let metadataRepository = connection.getRepository(PhotoMetadata);

    // first we should save a photo
    await photoRepository.save(photo);

    // photo is saved. Now we need to save a photo metadata
    await metadataRepository.save(metadata);

    // done
    console.log("Metadata is saved, and relation between metadata and photo is created in the database too");
    
    let photos = await photoRepository.find({relations:["metdata"]})
    console.table(photos)

}).catch(error => console.log(error));
