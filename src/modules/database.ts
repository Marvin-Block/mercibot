import { createConnection, getRepository } from "typeorm";
import chalk from "chalk";
import { AdminRole } from "../entity/AdminRole";

export async function init() {
    return new Promise((resolve) => {
        createConnection().then((a) => {
            console.log(`Loading: "${chalk.blue('Database Connected!')}"`);
            resolve()
        });
    });
}
