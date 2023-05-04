import { JwtPayload } from "jsonwebtoken";
export interface Jwt extends JwtPayload {
  walletAddr: string;
}
