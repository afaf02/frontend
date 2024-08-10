export interface Admin {
  imageUrl: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  address: string;
}

export interface Review {
  dealSuccessFul?: boolean;
  comments?: string;
  behaviour: number;
  priceNegotiation: number;
  responsiveness: number;
  communication: number;
  technicalSkills: number;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Certificate {
  category: string;
  imageUrl: string;
}

export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}
