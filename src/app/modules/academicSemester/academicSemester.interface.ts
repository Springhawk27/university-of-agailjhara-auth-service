import { Model } from 'mongoose';

type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAcademicSemester = {
  // title: string;
  title: 'Autumn' | 'Summer' | 'Fall';
  year: number;
  // code: string;
  code: '01' | '02' | '03';
  // startMonth: string;
  startMonth: Month;
  // endMonth: string;
  endMonth: Month;
};

export type AcademicSemesterModel = Model<IAcademicSemester>;
