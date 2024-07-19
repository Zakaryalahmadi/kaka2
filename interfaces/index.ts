export type PersonBaseData = {
  ID: string;
  FIRSTNAME: string;
  LASTNAME: string;
  EMAIL: string;
  COMPANY: string;
  PHONE: string;
  DATE_CREATED: string | null;
  DATE_UPDATED: string | null;
  API_ID: string;
  API_TYPE: string;
};

export type ExternalData = PersonBaseData & {
  SCHOOL_ID: string;
  TYPE: number;
  HIDDEN: number;
};

export type StudentData = PersonBaseData & {
  id: string;
  USERNAME: string;
  PHOTO: null | string;
  TRAINING_NAME: string;
  FILE_NUMBER: null | number;
  TAGS: string[];
  SIGNATURE_ID: string;
  HIDDEN: number;
  MULTI_ACCOUNT_LOGIN_CODE: number;
  SCHOOL_ID: string;
  BADGE_ID: string;
  LANGUAGE: string;
  NEW_PASSWORD_NEEDED: number;
  STUDENT_FOLLOWER_ID: string[];
  GROUPS: string[];
  VARIABLES: string[];
};
