import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layouts/Layout";
import HomePage from "@/pages/Home";
import Movies from "@/pages/Movies";
import Search from "@/pages/Search";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route path="/movies/:moviesId" element={<Movies />} />
        <Route
          path="/search/:searchMovie"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
