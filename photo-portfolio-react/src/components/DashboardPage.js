import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";
import {
  getListOfAdmins,
  verifyAdmin,
  enableOrDisableAdmin
} from "../actions/admins";
import ManageAdmins from "./ManageAdmins";
import ManageContent from "./ManageContent";
import DemoPurpose from "./DemoPurpose";

class DashboardPage extends React.Component {
  componentWillMount = () => {
    if (this.props.alpha) this.props.getListOfAdmins();
  };

  verifyAdmin = username =>
    this.props.verifyAdmin(username).then(() => {
      this.props.getListOfAdmins();
    });

  enableOrDisableAdmin = (username, enableOrDisable) =>
    this.props.enableOrDisableAdmin(username, enableOrDisable).then(() => {
      this.props.getListOfAdmins();
    });

  // refactor this!!!
  render = () => {
    const { enabled, verified, alpha, admins } = this.props;
    return (
      <div>
        <h2>Dashboard</h2>
        {!verified && (
          <div>
            <Message warning>
              <Message.Header>Account Not Yet Verified</Message.Header>
              <p>
                Your account needs to be verified for you to gain admin
                previlages, get a chief admin to verify your account. Re-login after verification.
              </p>
            </Message>
            <DemoPurpose message="login as 'username: admin, password: admin' to verify your account" />
          </div>
        )}
        {!enabled && (
          <div>
            <Message negative>
              <Message.Header>Account Disabled</Message.Header>
              <p>
                Your account has been disabled. If you believe this to be a
                mistake, contact a chief admin
              </p>
            </Message>
            <DemoPurpose message="login as 'username: admin, password: admin' to enable your account" />
          </div>
        )}
        {enabled &&
          verified && (
            <div>
              {alpha && (
                <ManageAdmins
                  admins={admins}
                  verifyAdmin={this.verifyAdmin}
                  enableOrDisableAdmin={this.enableOrDisableAdmin}
                />
              )}<br /><hr />
              <ManageContent />
            </div>
          )}
      </div>
    );
  };
}

DashboardPage.propTypes = {
  verified: PropTypes.bool.isRequired,
  alpha: PropTypes.bool.isRequired,
  enabled: PropTypes.bool.isRequired,
  getListOfAdmins: PropTypes.func.isRequired,
  verifyAdmin: PropTypes.func.isRequired,
  enableOrDisableAdmin: PropTypes.func.isRequired,
  admins: PropTypes.object.isRequired
};

function mapStateToProps({ user, admins }) {
  return {
    verified: user.verified,
    alpha: user.alpha,
    enabled: user.enabled,
    admins
  };
}

export default connect(mapStateToProps, {
  getListOfAdmins,
  verifyAdmin,
  enableOrDisableAdmin
})(DashboardPage);
