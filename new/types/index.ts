interface COACH {
  _id: String;
  thumbnail: String;
  email: String;
  username: String;
  image: String;
}
export interface CourseType {
  _id: String;
  thumbnail: String;
  title: String;
  coach: COACH;
  cost: Number;
  releaseDate: Date;
  headline: String;
  transcript?: String;
}

export type CHAPTER_TYPE = {
  _id: String;
  description: String;
  title: String;
};

interface VERSION_TYPE {
  _id: String;
  abbreviation: String;
  title: String;
  createdAt: Date;
  updatedAt: Date;
}

interface VIDEO_TYPE {
  _id: String;
  filename: String;
  title: String;
  path: String;
  type: String;
  createdAt: Date;
  updatedAt: Date;
}

export type VIDEO_VERSION_UNION = {
  _id: String;
  filename: String;
  title: String;
  path: String;
  type: String;
  createdAt: Date;
  updatedAt: Date;
  version: VERSION_TYPE;
};
