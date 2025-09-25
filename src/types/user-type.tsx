type role = {
  name: string;
};
type rt = {
  name: string;
};

export type user = {
  id: string;
  roleId: string;
  username: string;
  rtId: string;
  role: role;
  rt: rt;
};
