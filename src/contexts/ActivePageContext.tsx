import React, { createContext, useState } from 'react';

interface ActivePageProviderData {
  activePage: 'challenge' | 'leaderboard';
  handleActivePage: (page: 'challenge' | 'leaderboard') => void;
}

export const ActivePageContext = createContext({} as ActivePageProviderData);

export const ActivePageProvider: React.FC = ({ children }) => {
  const [activePage, setActivePage] = useState<'challenge' | 'leaderboard'>('challenge');

  const handleActivePage = (page: 'challenge' | 'leaderboard') => {
    setActivePage(page);
  };

  return (
    <ActivePageContext.Provider value={{
      activePage,
      handleActivePage,
    }}
    >
      { children }
    </ActivePageContext.Provider>
  );
};
