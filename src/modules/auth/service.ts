import { User } from './model';
import { hashPassword } from '../../utils/hash';
import { env } from 'node:process';
// import dotenv from 'dotenv';
// dotenv.config();

export const createDefaultSuperAdmin = async () => {
    const existing = await User.findOne({ role: 'super-admin' });
    if (existing) {
      console.log('Super Admin already exists');
      return;
    }
  
    const user = new User({
      name: 'Super Admin',
      email: process.env.SUPER_ADMIN_EMAIL,
      password: await hashPassword(process.env.SUPER_ADMIN_PASSWORD as string),
      role: 'super-admin'
    });
  
    await user.save();
    console.log('Super Admin created');
  };
  

export const createSubAdmin = async (payload: any) => {
  const existing = await User.findOne({ email: payload.email });
  if (existing) throw new Error('Email already exists');
  
  const user = new User({
    ...payload,
    role: 'sub-admin',
    password: await hashPassword(payload.password)
  });

  return user.save();
};

export const getAllSubAdmins = () => User.find({ role: 'sub-admin' });
export const getSubAdmin = (id: string) => User.findById(id);
export const updateSubAdmin = (id: string, payload: any) => User.findByIdAndUpdate(id, payload, { new: true });
export const deleteSubAdmin = (id: string) => User.findByIdAndDelete(id);
