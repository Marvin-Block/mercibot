import {createConnection} from 'typeorm';

export async function init() {
    createConnection().then((a) => {
        console.log('Imported database')
    });
}
