import Footer from "./components/footer";
import Header from "./components/header";
import MovieGrid from "./components/movie-grid";


export default function App() {
  return (
      <>
        <Header/>
        <main>
            <MovieGrid/>
        </main>
        <Footer/>
      </>
  );
}