import './App.css';

function App() {
  const handleTestLogin = async () => {
    console.log("Tombol Tes Login Ditekan. Memulai fetch...");
    const loginData = {
      username: "adminutama",
      password: "passwordyangaman" 
    };

    try {
      // --- PERUBAHAN DI SINI: localhost -> 127.0.0.1 ---
      const response = await fetch('http://127.0.0.1:5001/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      console.log("Fetch selesai. Status:", response.status);
      const data = await response.json();
      console.log("Data dari server:", data);
      
      alert("RESPONS DITERIMA DARI SERVER: " + JSON.stringify(data));

    } catch (error) {
      console.error("FETCH GAGAL:", error);
      alert("FETCH GAGAL: " + error.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Halaman Tes Login Minimal</h1>
        <p>Tombol ini akan langsung menekan endpoint login tanpa logika rumit.</p>
        <button onClick={handleTestLogin} style={{ padding: '20px', fontSize: '20px', cursor: 'pointer' }}>
          Tes Koneksi Login
        </button>
      </header>
    </div>
  );
}

export default App;