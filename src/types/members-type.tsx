import { Rt } from "./rt-type";
export type status_member = {
  id: string;
  name: string;
};
export type members = {
  id: string;
  name: string;
  rtId: string;
  status_memberId: string;
  rt: Rt;
  Status_member: status_member;
};

export type allMembers = {
  data: members[];
  status: string;
  page: number;
  totalData: number;
  totalPage: number;
};
