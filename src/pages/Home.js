import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SearchAlbum from "../components/SearchAlbum";

const Home = () => {
  return (
    <div>
      <Navbar />
      <SearchAlbum />
      <Footer />
    </div>
  );
};

export default Home;
