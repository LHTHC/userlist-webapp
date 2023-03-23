type dataInfo = {
  results: number;
  page: number;
};

export interface User {
  email: string;
  gender: string;
  location: { city: string };
  country: string;
  nat: string;
  id: string;
  name: {
    first: string;
    last: string;
  };
  phone: string;
  picture: { large: string; medium: string; thumbnail: string };
  dob: { date: string };
}

export interface IUsers {
  info: dataInfo;
  results: User[];
}
