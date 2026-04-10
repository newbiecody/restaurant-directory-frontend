export interface ActivityActor {
  id: number;
  username: string;
  avatarUrl: string;
}

export interface ActivitySubject {
  type: "USER" | "DISH" | "PLACE";
  id: number;
  name: string;
}

export default interface Activity {
  id: number;
  actor: ActivityActor;
  subject: ActivitySubject;
  actionType: string;
  metaData: Record<string, unknown>;
  createdAt: string;
}
