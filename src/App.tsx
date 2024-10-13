import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Layout from "@/components/layouts/Layout";
import HomePage from "@/pages/Home";
import { Movies, DetailMovie } from "@/pages/Movies";
import { Series, DetailSeries } from "@/pages/Series";
import { Cast, DetailCast } from "@/pages/Cast";
import { Genre, DetailGenre } from "./pages/Genre";
import { DiscoverPage, DetailDiscoverPage } from "./pages/Discover";
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
          path="discover"
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route index element={<DiscoverPage />} />
          <Route path="tv" element={<DetailDiscoverPage />} />
          <Route path="movie" element={<DetailDiscoverPage />} />
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
