function Nav({ currentView, setView }) {
  return (
    <nav className="main-nav">
      <button
        className={currentView === 'pos' ? 'active' : ''}
        onClick={() => setView('pos')}
      >
        Tampilan Kasir
      </button>
      <button
        className={currentView === 'admin' ? 'active' : ''}
        onClick={() => setView('admin')}
      >
        Manajemen Menu
      </button>
      {/* --- TOMBOL BARU --- */}
      <button
        className={currentView === 'dashboard' ? 'active' : ''}
        onClick={() => setView('dashboard')}
      >
        Dashboard
      </button>
    </nav>
  );
}

export default Nav;