import { Routes, Route } from "react-router-dom";
import AppShell from "./shell/AppShell";
import Showcase from "./pages/Showcase";
import Connect from "./pages/Connect";
import Account from "./pages/Account";
import Watch from "./pages/Watch";
import Listen from "./pages/Listen";
import Read from "./pages/Read";
import News from "./pages/News";
import Weather from "./pages/Weather";
import StubPage from "./pages/StubPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Showcase />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/listen" element={<Listen />} />
        <Route path="/read" element={<Read />} />
        <Route path="/news" element={<News />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/play" element={<StubPage title="Play" note="Web & HTML5 games" />} />
        <Route path="/destinations" element={<StubPage title="Destinations" note="Featured destination guides" />} />
        <Route path="/travel" element={<StubPage title="Travel" note="Trip inspiration & guides" />} />
        <Route path="/shop" element={<StubPage title="Shop" note="Duty-free & in-flight shopping" />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<StubPage title="Not found" note="No such page" />} />
      </Route>
    </Routes>
  );
}
