import { User } from '../../models/User'; // Adjust the import based on your project structure

declare module 'express-serve-static-core' {
  interface Request {
    user?: User | any;
  }
}