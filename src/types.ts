export type MP = {
  id?: string; // ให้ optional เพราะตอนเพิ่มอาจยังไม่มี
  prefix: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  history: string;
  achievement: string;
  position: string;
  ministry?: string;
  party: string;
  province?: string | null;
};
