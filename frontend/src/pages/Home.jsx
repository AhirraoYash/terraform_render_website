import Button from '../components/Button.jsx';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to MERN Starter</h1>
      <p className="mb-6 text-gray-700">A minimal MERN stack with auth context and routing.</p>
      <Link to="/signup"><Button>Get Started</Button></Link>
    </section>
  );
}


