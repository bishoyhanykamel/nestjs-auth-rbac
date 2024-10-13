import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class HashingProvider {
  abstract comparePasswords(data: string | Buffer, encryptedData: string): Promise<boolean>;
  abstract hashPassword(data: string | Buffer): Promise<string>;
}