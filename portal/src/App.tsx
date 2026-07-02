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
import Play from "./pages/Play";
import BlogIndex from "./pages/BlogIndex";
import BlogArticle from "./pages/BlogArticle";
import Studio from "./pages/Studio";
import InfoPage from "./pages/InfoPage";
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
        <Route path="/play" element={<Play />} />
        <Route path="/destinations" element={<BlogIndex section="destinations" />} />
        <Route path="/destinations/:slug" element={<BlogArticle section="destinations" />} />
        <Route path="/travel" element={<BlogIndex section="travel" />} />
        <Route path="/travel/:slug" element={<BlogArticle section="travel" />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/terms" element={<InfoPage pageKey="terms" />} />
        <Route path="/privacy" element={<InfoPage pageKey="privacy" />} />
        <Route path="/legal" element={<InfoPage pageKey="legal" />} />
        <Route path="/contact" element={<InfoPage pageKey="contact" />} />
        <Route path="/shop" element={<StubPage title="Shop" note="Duty-free & in-flight shopping" />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<StubPage title="Not found" note="No such page" />} />
      </Route>
    </Routes>
  );
}
