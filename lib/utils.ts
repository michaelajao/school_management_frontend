import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export type UserRole = 'student' | 'teacher' | 'admin';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const inviteLinks: Record<string, UserRole> = {
  'abc123xyz': 'student',
  'def456uvw': 'teacher',
  'ghi789rst': 'admin',
};