import AuthorizeView, { AuthorizedUser } from "../components/AuthorizeView";
import LogoutLink from "../components/LogoutLink";
import WeatherForecast from "../components/WeatherForecast";

function Home() {
    return (
        <AuthorizeView>
            <span>
                <LogoutLink>
                    Logout <AuthorizedUser value="email" />
                </LogoutLink>
            </span>
            <WeatherForecast />
        </AuthorizeView>
    );
}

export default Home;
