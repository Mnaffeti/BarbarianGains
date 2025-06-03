
"use client";
// This file is kept for compatibility if other parts of the app used a separate useAuth hook.
// However, the AuthContext.tsx now exports useAuth directly.
// You can typically import useAuth from '@/contexts/AuthContext'.
import { useAuth as useAuthFromContext } from '@/contexts/AuthContext';

export const useAuth = useAuthFromContext;
