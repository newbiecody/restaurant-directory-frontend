"use client";

import api from "@/lib/api";
import type User from "@/types/user.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";

export type UserState = User | null;

interface IUserActions {
  setUser: (user: UserState) => void;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
}

interface IUserContextValue {
  user: UserState;
  isLoading: boolean;
  isError: boolean;
  actions: IUserActions;
}

export const AUTH_QUERY_KEY = ["auth"] as const;

const UserContext = createContext<IUserContextValue | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

const checkAuth = () => api.get<User | null>("/auth/me");

export function UserProvider({ children }: UserProviderProps) {
  const queryClient = useQueryClient();

  const {
    data: user = null,
    isLoading,
    isError,
  } = useQuery<UserState>({
    queryKey: AUTH_QUERY_KEY,
    queryFn: checkAuth,
    retry: false,
    staleTime: Infinity,
  });

  const setUser = useCallback(
    (newUser: UserState) => {
      queryClient.setQueryData<UserState>(AUTH_QUERY_KEY, newUser);
    },
    [queryClient]
  );

  const updateUser = useCallback(
    (updates: Partial<User>) => {
      queryClient.setQueryData<UserState>(AUTH_QUERY_KEY, (prev) => {
        if (!prev) return prev;
        return { ...prev, ...updates } as User;
      });
    },
    [queryClient]
  );

  const logout = useCallback(() => {
    queryClient.setQueryData<UserState>(AUTH_QUERY_KEY, null);
  }, [queryClient]);

  const actions: IUserActions = useMemo(
    () => ({ setUser, updateUser, logout }),
    [setUser, updateUser, logout]
  );

  const contextValue: IUserContextValue = useMemo(
    () => ({ user, isLoading, isError, actions }),
    [user, isLoading, isError, actions]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export default UserProvider;

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export const useUser = () => {
  return useUserContext();
};

export const useUserActions = () => {
  const { actions } = useUserContext();
  return actions;
};
