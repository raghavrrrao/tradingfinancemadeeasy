import { Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import StudyLayout from "./layouts/StudyLayout";
import Home from "./pages/Home";
import StudyIndex from "./pages/StudyIndex";
import CategoryPage from "./pages/CategoryPage";
import ArticlePage from "./pages/ArticlePage";
import Search from "./pages/Search";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />

        <Route path="study-material" element={<StudyLayout />}>
          <Route index element={<StudyIndex />} />
          <Route path=":categorySlug" element={<CategoryPage />} />
          <Route path=":categorySlug/:articleSlug" element={<ArticlePage />} />
        </Route>

        <Route path="search" element={<Search />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
