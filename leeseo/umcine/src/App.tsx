import Footer from "./components/layout/footer";
import Header from "./components/layout/header";
import MovieListPage from "./pages/movies/movie-list-page";

export default function App() {

  return (
      <>
        <Header/>
        <main>
            <MovieListPage/>
        </main>
        <Footer/>
      </>
  );
}