import React from "react";
import { Icon } from "semantic-ui-react";

/* your logout logic shouldn't go here, take it to an action. because logout will return an empty user state */
const HomePage = () => 
  <div id="home">
    <Icon className="icon" size="massive" name="add circle" />
    <p>Portfolio empty. If you are an admin, login or sign up to add and manage content</p>
  </div>;

export default HomePage;
