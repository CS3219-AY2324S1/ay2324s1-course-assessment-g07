import LandingPage from './components/Server/LandingPage/LandingPage';
import NavigationBar from './components/Server/NavigationBar/NavigationBar';

export default function Home() {
  return (
    <main>
      <NavigationBar isAuthenticated={false} />
      <LandingPage />
    </main>
  );
}
