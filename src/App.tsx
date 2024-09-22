import Layout from "@/components/layouts/Layout";
import { Cast, DetailCast } from "@/pages/Cast";
import HomePage from "@/pages/Home";
import { DetailMovie, Movies } from "@/pages/Movies";
import Search from "@/pages/Search";
import { DetailSeries, Series } from "@/pages/Series";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Genre, DetailGenre } from "./pages/Genre";

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
        <Route
          path="movies"
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route index element={<Movies />} />
          <Route path=":movieId" element={<DetailMovie />} />
          <Route path="page" element={<Movies />}>
            <Route path=":pageNumber" element={<Movies />} />
          </Route>
        </Route>
        <Route
          path="series"
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route index element={<Series />} />
          <Route path=":seriesId" element={<DetailSeries />} />
          <Route path="page" element={<Series />}>
            <Route path=":pageNumber" element={<Series />} />
          </Route>
        </Route>
        <Route
          path="cast"
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route index element={<Cast />} />
          <Route path=":castId" element={<DetailCast />} />
          <Route path="page" element={<Cast />}>
            <Route path=":pageNumber" element={<Cast />} />
          </Route>
        </Route>

        <Route
          path="genre"
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route index element={<Genre />} />
          <Route path=":genreId" element={<DetailGenre />}>
            <Route path="page" element={<Genre />}>
              <Route path=":pageNumber" element={<Genre />} />
            </Route>
          </Route>
        </Route>
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
