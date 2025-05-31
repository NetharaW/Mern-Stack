import React from "react";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
     return (
        <>
            <section>
                <Header/>
                <Hero/>
            </section>
        </>
     );
};

export default Home;