import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { WINDOW_CONFIG, INITIAL_Z_INDEX } from "#constants/index.js";

const useWindowStore = create(
    immer((set) => ({
        windows: WINDOW_CONFIG,
        nextZIndex: INITIAL_Z_INDEX + 1,
        archivedWindows: null,

        openWindow: (windowKey, data = null) =>
            set((state) => {
                const win = state.windows[windowKey];

                win.isOpen = true;
                win.zIndex = state.nextZIndex;
                win.data = data ?? win.data;
                state.nextZIndex++;
            }),
        closeWindow: (windowKey) =>
            set((state) => {
                const win = state.windows[windowKey];

                win.isOpen = false;
                win.zIndex = INITIAL_Z_INDEX;
                win.data = null;
            }),
        closeAllWindows: () =>
            set((state) => {
                Object.values(state.windows).forEach((win) => {
                    win.isOpen = false;
                    win.zIndex = INITIAL_Z_INDEX;
                    win.data = null;
                });
            }),
        toggleArchive: () =>
            set((state) => {
                const openWindows = Object.entries(state.windows).filter(
                    ([, win]) => win.isOpen,
                );

                if (openWindows.length > 0) {
                    state.archivedWindows = Object.fromEntries(
                        openWindows.map(([key, win]) => [
                            key,
                            {
                                data: win.data,
                                zIndex: win.zIndex,
                            },
                        ]),
                    );

                    Object.values(state.windows).forEach((win) => {
                        win.isOpen = false;
                        win.zIndex = INITIAL_Z_INDEX;
                        win.data = null;
                    });
                    return;
                }

                if (!state.archivedWindows) return;

                Object.entries(state.archivedWindows).forEach(
                    ([key, archivedWindow]) => {
                        const win = state.windows[key];
                        if (!win) return;

                        win.isOpen = true;
                        win.zIndex = archivedWindow.zIndex;
                        win.data = archivedWindow.data;
                    },
                );
            }),

        focusWindow: (windowKey) =>
            set((state) => {
                const win = state.windows[windowKey];

                win.zIndex = state.nextZIndex++;
            }),
    }))
);

export default useWindowStore;