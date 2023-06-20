'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.generateAdminId =
  exports.findLastAdminId =
  exports.generateFacultyId =
  exports.findLastFacultyId =
  exports.generateStudentId =
  exports.findLastStudentId =
  exports.generateUserId =
  exports.findLastUserId =
    void 0;
const user_model_1 = require('./user.model');
const findLastUserId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    // lean will return a pure javacript object instead of a document(lean in mongodb)
    const lastUser = yield user_model_1.User.findOne({}, { id: 1, _id: 0 })
      .sort({
        createdAt: -1,
      })
      .lean();
    return lastUser === null || lastUser === void 0 ? void 0 : lastUser.id;
  });
exports.findLastUserId = findLastUserId;
// let lastUserId = 0
const generateUserId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentId =
      (yield (0, exports.findLastUserId)()) || (0).toString().padStart(5, '0');
    const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    return incrementedId;
    // lastUserId++
    // return String(lastUserId).padStart(5, '0')
  });
exports.generateUserId = generateUserId;
//////
const findLastStudentId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    // lean will return a pure javacript object instead of a document(lean in mongodb)
    const lastStudent = yield user_model_1.User.findOne(
      {
        role: 'student',
      },
      { id: 1, _id: 0 }
    )
      .sort({
        createdAt: -1,
      })
      .lean();
    return (
      lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id
    )
      ? lastStudent.id.substring(4)
      : undefined;
  });
exports.findLastStudentId = findLastStudentId;
const generateStudentId = academicSemester =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentId =
      (yield (0, exports.findLastStudentId)()) ||
      (0).toString().padStart(5, '0');
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `${
      academicSemester === null || academicSemester === void 0
        ? void 0
        : academicSemester.year.substring(2)
    }${
      academicSemester === null || academicSemester === void 0
        ? void 0
        : academicSemester.code
    }${incrementedId}`;
    // console.log(incrementedId);
    return incrementedId;
    // lastUserId++
    // return String(lastUserId).padStart(5, '0')
  });
exports.generateStudentId = generateStudentId;
const findLastFacultyId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    // lean will return a pure javacript object instead of a document(lean in mongodb)
    const lastFaculty = yield user_model_1.User.findOne(
      {
        role: 'faculty',
      },
      { id: 1, _id: 0 }
    )
      .sort({
        createdAt: -1,
      })
      .lean();
    return (
      lastFaculty === null || lastFaculty === void 0 ? void 0 : lastFaculty.id
    )
      ? lastFaculty.id.substring(2)
      : undefined;
  });
exports.findLastFacultyId = findLastFacultyId;
const generateFacultyId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentId =
      (yield (0, exports.findLastFacultyId)()) ||
      (0).toString().padStart(5, '0');
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `F-${incrementedId}`;
    // console.log(incrementedId);
    return incrementedId;
  });
exports.generateFacultyId = generateFacultyId;
const findLastAdminId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    // lean will return a pure javacript object instead of a document(lean in mongodb)
    const lastAdmin = yield user_model_1.User.findOne(
      {
        role: 'admin',
      },
      { id: 1, _id: 0 }
    )
      .sort({
        createdAt: -1,
      })
      .lean();
    return (lastAdmin === null || lastAdmin === void 0 ? void 0 : lastAdmin.id)
      ? lastAdmin.id.substring(2)
      : undefined;
  });
exports.findLastAdminId = findLastAdminId;
const generateAdminId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const currentId =
      (yield (0, exports.findLastAdminId)()) || (0).toString().padStart(5, '0');
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `A-${incrementedId}`;
    // console.log(incrementedId);
    return incrementedId;
  });
exports.generateAdminId = generateAdminId;
