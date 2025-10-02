import { Rt } from "./rt-type";
type status_member = {
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
