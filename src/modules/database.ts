import {createConnection} from 'typeorm';

export async function init() {
    createConnection();
}