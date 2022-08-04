import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchAlbum";

const Home = () => {
  return (
    <div>
      <Navbar />
      <SearchBar />
      <Footer />
    </div>
  );
};

export default Home;
