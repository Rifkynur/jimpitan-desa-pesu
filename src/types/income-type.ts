type IncomeItem = {
  id: string;
  amount: number;
};

type WeeklyAmounts = {
  [date: string]: IncomeItem[];
};

type MemberIncome = {
  name: string;
  weeklyAmounts: WeeklyAmounts;
};

export type RtIncomeGroup = {
  rt: string;
  members: MemberIncome[];
};

export type GetIncomeResponse = {
  page: number;
  totalPage: number;
  totalMembers: number;
  limit: number;
  data: RtIncomeGroup[];
};
