import { Document, model, Schema } from 'mongoose';

interface mAdminUser {
  name: string;
  pass: string;
  roles: string[]; // application level roles
}

const mAdminUserSchema = new Schema<mAdminUser & Document>(
  {
    name: { type: String, required: true },
    pass: { type: String, required: true },
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