import React from "react";
import Chunk from "components/Chunk";

const loadHomeContainer = () => import("containers/Home" /* webpackChunkName: "home" */);

const Home = () => <Chunk load={loadHomeContainer}/>;

export default Home;
