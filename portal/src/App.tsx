import { Routes, Route } from "react-router-dom";
import AppShell from "./shell/AppShell";
import Showcase from "./pages/Showcase";
import Connect from "./pages/Connect";
import Account from "./pages/Account";
import Watch from "./pages/Watch";
import Listen from "./pages/Listen";
import Read from "./pages/Read";
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
        <Route path="/news" element={<StubPage title="News" note="Editorial headlines" />} />
        <Route path="/weather" element={<StubPage title="Weather" note="Destination forecast" />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<StubPage title="Not found" note="No such page" />} />
      </Route>
    </Routes>
  );
}
