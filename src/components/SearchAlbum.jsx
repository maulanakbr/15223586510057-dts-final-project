import React, { useState, useEffect } from "react";
import { CLIENT_ID, CLIENT_SECRET } from "../apis/spotify";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

  const truncateString = (str, numb) => {
    if (str?.length > numb) {
      return str.slice(0, numb) + "...";
    } else {
      return str;
    }
  };

  useEffect(() => {
    const authParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    };

    fetch("https:/accounts.spotify.com/api/token", authParams)
      .then((result) => result.json())
      // .then((data) => console.log(data.access_token));
      .then((data) => setAccessToken(data.access_token));
  }, []);

  const searchItem = async () => {
    console.log("Search for " + searchInput);

    const searchParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const artistID = await fetch(
      `https://api.spotify.com/v1/search?q=${searchInput}&type=artist`,
      searchParams
    )
      .then((response) => response.json())
      // .then((data) => console.log(data));
      .then((data) => {
        return data.artists.items[0].id;
      });

    console.log("Artist ID is " + artistID);

    const returnedAlbums = await fetch(
      `https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=50`,
      searchParams
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAlbums(data.items);
      });

    console.log(albums);
  };

  return (
    <div>
      <div className="flex justify-center ml-6">
        <div className="xl:w-96">
          <div className="input-group relative flex flex-wrap items-stretch w-full mb-8 rounded">
            <input
              type="search"
              className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2"
              onKeyPress={(event) => {
                if (event.key == "Enter") {
                  searchItem();
                }
              }}
              onChange={(event) => setSearchInput(event.target.value)}
            />
            <span
              className="input-group-text flex items-center px-3 py-1.5 text-base font-normal text-gray-700 text-center whitespace-nowrap rounded"
              id="basic-addon2"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="search"
                className="w-4 cursor-pointer"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                onClick={searchItem}
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {albums.map((album, i) => {
          console.log(album);
          return (
            <div key={album.id} className="flex flex-wrap justify-center">
              <div className="rounded-lg shadow-lg bg-white max-w-sm">
                <a>
                  <img
                    className="rounded-t-lg"
                    src={album.images[0].url}
                    alt=""
                  />
                </a>
                <div className="p-6">
                  <h5 className="text-gray-900 text-lg font-bold mb-1">
                    {truncateString(album.name, 30)}
                  </h5>
                  <p className="text-gray-700 text-base">
                    Released date:{" "}
                    <span className="text-blue-600">{album?.release_date}</span>
                  </p>
                  <p className="text-gray-700 text-base mb-2">
                    Total tracks:{" "}
                    <span className="text-blue-600">{album?.total_tracks}</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchBar;
