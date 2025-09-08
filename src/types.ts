export type MP = {
    id: string;
    prefix: string;
    firstName: string;
    lastName: string;
    photoUrl: string;
    history: string;
    achievement: string;
    position: string;
    ministry: string;
    party: string;
    province?: string | null; // 👈 เพิ่มอันนี้
};
