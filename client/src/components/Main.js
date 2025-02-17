import React, { useState, useEffect } from "react";
import Home from "./Home";
import Crawl from "./Crawl";
import Faves from "./Faves";
import Friends from "./Friends";
import Judgie from "./Judgie";
import Map from "./Map";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";

function Main({ isLoggedIn, setIsLoggedIn }) {
    const [restaurantData, setRestaurantData] = useState([]);
    // const [favoritedRestaurant, setFavoritedRestaurant] = useState([]);
    const [goFetch, setGoFetch] = useState(false);
    const [pageCount, setPageCount] = useState(1);
    const [usersData, setUsersData] = useState([]);
    const [favesList, setFavesList] = useState([]);
    const resultsPerPage = 10;
    const currentUserId = parseInt(localStorage.getItem("user-token"));

    useEffect(() => {
        fetch(`http://localhost:9292/restaurants?limit=${resultsPerPage}&page=1`)
            .then(res => res.json())
            .then(data => setRestaurantData(data))
            .catch(err => console.error(err))
    }, []);
    // Add event listener to scroll and clean up function
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    // If goFetch state is true, fetch more items. Otherwise do nothing. This useEffect will run each time goFetch is updated
    useEffect(() => {
        if (!goFetch) return;
        fetchMoreItems()
    }, [goFetch])
    // Function to fetch more items and append the restaurant array to the current restaurantData state. Then sets goFetch to false and ups page count by 1.
    useEffect(() => {
        fetch(`http://localhost:9292/users/${currentUserId}/following`)
            .then(res => res.json())
            .then(data => setUsersData(data))
            .catch(err => console.error(err))
    }, []);

    function fetchMoreItems() {
        fetch(`http://localhost:9292/restaurants?limit=${resultsPerPage}&page=${pageCount + 1}`)
            .then(res => res.json())
            .then(data => setRestaurantData([...restaurantData, ...data]))
        setGoFetch(false);
        setPageCount(pageCount => pageCount + 1)
    }
    // When you get to the bottom of the window, set goFetch state to true and run fetch more items.
    function handleScroll() {
        const remainingHeightinPixels = Math.abs(window.innerHeight + document.documentElement.scrollTop - document.documentElement.offsetHeight)
        if (remainingHeightinPixels > 1.2) return;
        setGoFetch(true)
    }
    // ReFetch for posted comments
    function reFetchAllRestaurants() {
        fetch(`http://localhost:9292/restaurants?limit=${resultsPerPage * pageCount}&page=1`)
            .then(res => res.json())
            .then(data => setRestaurantData(data))
            .catch(err => console.error(err))
    }
    useEffect(() => {
        fetch(`http://localhost:9292/users/${currentUserId}/faves`)
            .then(res => res.json())
            .then(data => setFavesList(data))
            .catch(err => console.error(err))
    }, [])

    function saveFaveRestaurant(fave) {
        setFavesList([...favesList, fave]);
    };

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/crawl" element={<Crawl
                restaurantData={restaurantData}
                saveFaveRestaurant={saveFaveRestaurant}
                reFetchAllRestaurants={reFetchAllRestaurants}
            />} />
            <Route path="/faves" element={<Faves
                favesList={favesList}
                setFavesList={setFavesList}
            />} />
            <Route path="/friends" element={<Friends usersData={usersData} />} />
            <Route path="/map" element={<Map />} />
            <Route path="/judgie" element={<Judgie />} />
            <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
    );
}

export default Main;