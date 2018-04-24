import React from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";

class Navbar extends React.Component {
  state = {};

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    switch (name) {
      case "Home":
        this.props.history.push("/");
        break;

      case "Login":
        this.props.history.push("/admin/login");
        break;

      case "Signup":
        this.props.history.push("/admin/register");
        break;

      case "Logout":
        this.props.logout();
        this.props.history.push("/");
        this.setState({ activeItem: "Home" });
        break;

      default:
        return;
    }
  };

  dashboard = () => {
      this.props.history.push("/admin");
      this.setState({ activeItem: ""});
  }

  render() {
    const { activeItem } = this.state;
    const { isAuthenticated, username } = this.props;
    return (
      <Menu>
        <div className="ui container">
          <Menu.Item
            name="Home"
            active={activeItem === "Home"}
            onClick={this.handleItemClick}
          >
            Home
          </Menu.Item>

          <Menu.Menu position="right">
            {!isAuthenticated && (
              <Menu.Item
                name="Login"
                active={activeItem === "Login"}
                onClick={this.handleItemClick}
              >
                Login
              </Menu.Item>
            )}
            {!isAuthenticated && (
              <Menu.Item
                name="Signup"
                active={activeItem === "Signup"}
                onClick={this.handleItemClick}
              >
                Sign Up
              </Menu.Item>
            )}
            {isAuthenticated && (
              <Dropdown item text={username}>
                <Dropdown.Menu>
                  <Dropdown.Item
                    icon="dashboard"
                    text="Dashboard"
                    onClick={this.dashboard}
                  />
                </Dropdown.Menu>
              </Dropdown>
            )}
            {isAuthenticated && (
              <Menu.Item
                name="Logout"
                active={activeItem === "Logout"}
                onClick={this.handleItemClick}
              >
                Logout
              </Menu.Item>
            )}
          </Menu.Menu>
        </div>
      </Menu>
    );
  }
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

function mapStateToProps({ user }) {
  return {
    isAuthenticated: !!user.token,
    username: user.username
  };
}
export default connect(mapStateToProps, { logout })(Navbar);
