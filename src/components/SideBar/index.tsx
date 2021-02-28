import React, { useContext, useState } from 'react';
import { signOut } from 'next-auth/client';
import Link from 'next/link';
import { FiAward, FiHome, FiLogOut } from 'react-icons/fi';

import styles from '@/styles/components/SideBar.module.css';
import { ActivePageContext } from '@/contexts/ActivePageContext';

const SideBar: React.FC = () => {
  const [mobileBar, setMobileBar] = useState(false);
  const { activePage, handleActivePage } = useContext(ActivePageContext);

  const handleClick = () => {
    setMobileBar(!mobileBar);
  };

  return (
    <aside className={`${styles.sideMenu} ${mobileBar && styles.mobileActive}`}>
      <div>
        <button type="button" onClick={handleClick}>
          <img src="/logo-sidebar.png" alt="Logo" />
        </button>
      </div>

      <nav>
        <div className={`${activePage === 'challenge' && styles.active}`}>
          <Link href="/challenge">
            <a onClick={() => handleActivePage('challenge')}>
              <FiHome size={32} />
            </a>
          </Link>
        </div>
        <div className={`${activePage === 'leaderboard' && styles.active}`}>
          <Link href="/leaderboard">
            <a onClick={() => handleActivePage('leaderboard')}>
              <FiAward size={32} />
            </a>
          </Link>
        </div>
      </nav>

      <div className={styles.signOut}>
        <button type="button" onClick={() => signOut()}>
          <FiLogOut size={20} />
          SignOut
        </button>
      </div>
    </aside>

  );
};

export default SideBar;
