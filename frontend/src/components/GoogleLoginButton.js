import { GoogleLogin } from 'react-google-login'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
const clientId = "522256695532-lu3rvkar7si1vi0pc2vr32h4mpc4iise.apps.googleusercontent.com"

function GoogleLoginButton({ click, setClick }) {
    const { Login } = useContext(AuthContext)
    const onSuccess = (res) => {
        // console.log('[Login Success] currentUser:', res.profileObj)
        if (click) {
            Login(res)
            setClick(false)
        }
    }

    const onFailure = (res) => {
        console.log('[Login Failed] res:', res)
    }

    return (
        <div>
            <GoogleLogin
                setClick={setClick}
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '100px' }}
                isSignedIn={true}
            />
        </div>
    )
}
export default GoogleLoginButton 