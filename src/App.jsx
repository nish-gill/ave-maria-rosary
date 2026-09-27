import Rosary from './pages/Rosary';

// The app is a single screen. Prayer position lives in the URL hash
// (e.g. #J1-HM05), so no router is needed.
export default function App() {
  return <Rosary />;
}
