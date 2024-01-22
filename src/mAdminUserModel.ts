import mongoose, { Document, model, Schema } from 'mongoose';

interface mAdminUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  pass: string;
  adminId: number; // Auto-incremental ID
  roles: string[]; // application level roles
}

const mAdminUserSchema = new Schema<mAdminUser & Document>(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
    name: { type: String, unique: true, required: true },
    pass: { type: String, required: true },
    adminId: { type: Number, unique: true, required: true },
    roles: { type: [String], default: []}
  },
  { timestamps: true } // If you want to include timestamps for created and updated at
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


export default mAdminUserModel;