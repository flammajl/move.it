import { signOut } from 'next-auth/client';
import { FiAward, FiHome, FiLogOut } from 'react-icons/fi';

import styles from '@/styles/components/SideBar.module.css';

const SideBar: React.FC = () => {
  return (
    <aside className={styles.sideMenu}>
    <div>
      <img src="/logo-sidebar.png" alt="Logo"/>
    </div>

    <nav>
      <div className={styles.active}>
        <FiHome size={32} />
      </div>
      <div>
        <FiAward size={32} />
      </div>
    </nav>

    <div>
      <button type="button" onClick={() => signOut()}>
        <FiLogOut size={20} />
        SignOut
      </button>
    </div>
  </aside>
  )
}

export default SideBar;