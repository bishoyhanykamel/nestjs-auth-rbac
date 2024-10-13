import { registerAs } from "@nestjs/config";

export default registerAs(('jwt'), () => ({
  issuer: process.env.JWT_ISSUER,
  audience: process.env.JWT_AUDIENCE,
  expireAt: parseInt(process.env.JWT_EXPIRE_AT) || 3600,
  secret: process.env.JWT_SECRET
}));