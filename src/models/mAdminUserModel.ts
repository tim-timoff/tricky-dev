import { Document, Schema, model } from 'mongoose';
import { Counter } from '../counters';

interface mAdminUser {
  id: true;
  name: string;
  pass: string;
  adminId: number; // Auto-incremental ID
  roles: string[]; // application level roles
}

const mAdminUserSchema = new Schema<mAdminUser & Document>(
  {
    name: { type: String, unique: true, required: true },
    pass: { type: String, required: true },
    adminId: { type: Number, unique: true },
    roles: { type: [String], default: [] }
  },
  { timestamps: true }
);

const mAdminUserModel = model<mAdminUser & Document>('mAdminUser', mAdminUserSchema, 'users');

export const mapAppRolesToMongoDBRoles = (applicationRoles: string[]): string[] => {
  const roleMappings: { [key: string]: string[] } = {
    'adminUser': ['dbAdmin', 'readWrite'],
    'trickyUser': ['readWriteAnyDatabase', 'userAdmin'],
  };

  const mongoDBRoles: string[] = [];

  applicationRoles.forEach(appRole => {
    if (roleMappings[appRole]) {
      mongoDBRoles.push(...roleMappings[appRole]);
    }
  });

  return mongoDBRoles;
};

// Pre-save hook to increment adminId before saving
mAdminUserSchema.pre('save', async function (next) 
{  try {
    if (!this.adminId) {
      // Increment adminId only if it's not already set
      this.adminId = await Counter.incrementAdminCounter();
    }
    next();
  } catch (error) {
    next(error as Error);
  }
});

export default mAdminUserModel;