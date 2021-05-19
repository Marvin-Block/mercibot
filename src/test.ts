import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from './entity/User';
import { Ban } from './entity/Ban';
import { AdminRole } from './entity/AdminRole';

createConnection()
  .then(async (connection) => {
    // https://typeorm.io/#/

    /**
     * saving entries using repository
     */
    const userRepository = connection.getRepository(User);
    const banRepository = connection.getRepository(Ban);
    const adminRoleRepository = connection.getRepository(AdminRole);
    console.log('Inserting a new user into the database...');
    const userList = [
      {
        discordId: '322659763643088897',
        name: 'Muffin#4222',
        age: 22
      },
      {
        discordId: '271305097324003328',
        name: 'Sephiran#2171',
        age: 21
      }
    ];
    for (const userEntry of userList) {
      const user = new User();
      user.discordId = userEntry.discordId;
      user.name = userEntry.name;
      user.age = userEntry.age;
      await userRepository.save(user);
      console.log('Saved a new user with id: ' + user.discordId);
    }

    const ban = new Ban();
    ban.reason = 'Test';
    ban.duration = 5;
    ban.user = await userRepository.findOne({
      discordId: '271305097324003328'
    });
    ban.bannedBy = await userRepository.findOne({
      discordId: '322659763643088897'
    });
    await banRepository.save(ban);

    const users = await userRepository.find();
    console.table(users);

    const bans = await banRepository.find({ relations: ['user', 'bannedBy'] });
    console.log(bans);

    const adminRole = new AdminRole();
    adminRole.discordId = '271305097324003328';
    adminRole.roleId = '844283720663564328';
    await adminRoleRepository.save(adminRole);


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
    // const photo = new Photo();
    // photo.name = 'Me and Bears';
    // photo.description = 'I am near polar bears';
    // photo.filename = 'photo-with-bears.jpg';
    // photo.isPublished = true;
    // create a photo metadata
    // const metadata = new PhotoMetadata();
    // metadata.height = 640;
    // metadata.width = 480;
    // metadata.compressed = true;
    // metadata.comment = 'cybershoot';
    // metadata.orientation = 'portrait';
    // metadata.photo = photo; // this way we connect them
    // get entity repositories
    // const photoRepository = connection.getRepository(Photo);
    // const metadataRepository = connection.getRepository(PhotoMetadata);
    // first we should save a photo
    // await photoRepository.save(photo);
    // photo is saved. Now we need to save a photo metadata
    // await metadataRepository.save(metadata);
    // done
    // console.log(
    //   'Metadata is saved, and relation between metadata and photo is created in the database too'
    // );
    // const photos = await photoRepository.find({ relations: ['metdata'] });
    // console.table(photos);
  })
  .catch((error) => console.log(error));
