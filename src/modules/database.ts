import {createConnection, createConnections} from 'typeorm';

export async function init() {
    createConnection();
}