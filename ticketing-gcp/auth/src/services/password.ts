import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
//the reason you need both scrypt and promisify is b//c scrypt is callback based,
//but by using promisify, we can turn it into a promise, which compatible with async/await

const scryptAsync = promisify(scrypt);

export class Password {
  //reminder static methods allows us to access methods of the given class
  //without creating an instance of that class
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString("hex")}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString("hex") === hashedPassword;
  }
}
