export type expense = {
  status: string;
  data: data[];
  page: number;
  totalPage: number;
  totalData: number;
};

type data = {
  id: string;
  date: Date;
  amount: number;
  userId: string;
  updatedAt: string;
  desc: string;
};
