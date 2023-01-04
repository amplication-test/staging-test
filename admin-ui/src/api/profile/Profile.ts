import { User } from "../user/User";

export type Profile = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  user?: User | null;
};
