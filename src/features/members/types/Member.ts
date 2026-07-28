export interface MemberMetadata {
  sub: string;
  name: string;
  email: string;
  department: string;
  email_verified: boolean;
  phone_verified: boolean;
}

export interface MemberResponse {
  member_id: string;
  project_id: string;
  user_id: string;
  role: "owner" | "admin" | "member";
  email: string;
  metadata: MemberMetadata;
}

export type MembersResponse = MemberResponse[];
