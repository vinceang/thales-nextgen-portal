import { Routes, Route } from "react-router-dom";
import AppShell from "./shell/AppShell";
import Showcase from "./pages/Showcase";
import Connect from "./pages/Connect";
import StubPage from "./pages/StubPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Showcase />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/watch" element={<StubPage title="Watch" note="Movies & TV" />} />
        <Route path="/listen" element={<StubPage title="Listen" note="Music & audio" />} />
        <Route path="/news" element={<StubPage title="News" note="Editorial headlines" />} />
        <Route path="/weather" element={<StubPage title="Weather" note="Destination forecast" />} />
        <Route path="/account" element={<StubPage title="Account" note="Account & settings — comp 03" />} />
        <Route path="*" element={<StubPage title="Not found" note="No such page" />} />
      </Route>
    </Routes>
  );
}
