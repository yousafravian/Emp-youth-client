// types/User.ts
export interface IUser {
  name: string;
  lastname: string;
  email: string;
  password: string;
  dob: Date;
  userType: 'student' | 'employer';
  company?: string; // Optional, required only for employers
  education?: string; // Optional, required only for students
  createdAt?: Date;
  updatedAt?: Date;
}
