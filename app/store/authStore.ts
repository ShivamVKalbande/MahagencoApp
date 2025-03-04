import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

export const useAuth = create
    (
        persist
            ((set) => ({
                status: 'yes',
                id:null,

                setId: (id) => set({ id }),
                setStatus: (status) => set({ status }),
                logout: async () => {
                    set({ status: 'yes', id:null });
                    await AsyncStorage.removeItem('auth');
                }
            }),
                {
                    name: 'auth',
                    storage: createJSONStorage(() => AsyncStorage),
                }
            )
    );