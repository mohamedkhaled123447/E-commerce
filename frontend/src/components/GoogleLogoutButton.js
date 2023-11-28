import { GoogleLogout } from "react-google-login";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { MDBBtn } from 'mdb-react-ui-kit';
const clientId = "522256695532-lu3rvkar7si1vi0pc2vr32h4mpc4iise.apps.googleusercontent.com"
const GoogleLogoutButton = () => {
    const { Logout } = useContext(AuthContext)
    const onSuccess = () => {
        Logout()
    }
    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
                icon={false}
                render={renderProps => (
                    <MDBBtn onClick={renderProps.onClick} disabled={renderProps.disabled}>Logout</MDBBtn>
                )}
            ></GoogleLogout>
        </div>
    )
}
export default GoogleLogoutButton;