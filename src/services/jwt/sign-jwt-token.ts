import type { Service } from "@/services";
import jwt from "jsonwebtoken";

export class SignJwtToken implements Service<null, string, string> {
  public repository = null;

  async run(
    content: string | object | Buffer<ArrayBufferLike>
  ): Promise<string> {
    return jwt.sign(content, process.env.JWT_PRIVATE_KEY, {
      expiresIn: "1h",
    });
  }
}
