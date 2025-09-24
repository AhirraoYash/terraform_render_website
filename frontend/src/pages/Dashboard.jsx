import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Dashboard() {
  const { user, authFetch } = useAuth();
  const [serverUser, setServerUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await authFetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/user/me`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch');
        setServerUser(data.user);
      } catch (e) {
        setError(e.message);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <div className="p-4 bg-white rounded border">
        <div className="font-medium mb-2">Client user state</div>
        <pre className="text-sm bg-gray-100 p-2 rounded overflow-auto">{JSON.stringify(user, null, 2)}</pre>
      </div>
      <div className="p-4 bg-white rounded border">
        <div className="font-medium mb-2">Server user info</div>
        {error && <div className="text-red-600">{error}</div>}
        <pre className="text-sm bg-gray-100 p-2 rounded overflow-auto">{JSON.stringify(serverUser, null, 2)}</pre>
      </div>
    </div>
  );
}


