'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.User = void 0;
const mongoose_1 = require('mongoose');
// 2. Create a Schema corresponding to the document interface.
const UserShema = new mongoose_1.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    student: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'Student',
    },
    // faculty: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Faculty',
    // },
    // admin: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Admin',
    // },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
// 3. Create a Model.
exports.User = (0, mongoose_1.model)('User', UserShema);
