import React, { useContext } from 'react';
import { signOut } from 'next-auth/client';
import Link from 'next/link';
import { FiAward, FiHome, FiLogOut } from 'react-icons/fi';

import styles from '@/styles/components/SideBar.module.css';
import { ActivePageContext } from '@/contexts/ActivePageContext';

const SideBar: React.FC = () => {
  const { activePage, handleActivePage } = useContext(ActivePageContext);

  return (
    <aside className={styles.sideMenu}>
      <div>
        <img src="/logo-sidebar.png" alt="Logo" />
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

      <div>
        <button type="button" onClick={() => signOut()}>
          <FiLogOut size={20} />
          SignOut
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
