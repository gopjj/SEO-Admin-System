//创建 context
import { createContext } from 'react';


export interface AppContextType {
    state: AppState;
    setState: React.Dispatch<React.SetStateAction<object>>;
}

export interface AppState {
    userName?: string;
}

export const AppContext = createContext<AppContextType>({
    state: { userName: 'Default User' }, // 设置默认的用户名
    setState: () => {}
  });
