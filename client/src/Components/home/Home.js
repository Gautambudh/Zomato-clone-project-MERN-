import MainHeader from "./MainHeader";
import MealTypes from "./MealTypes";

function Home() {
    return (
    <>
    <div className="container-fluid bg">
        <MainHeader />
    </div>
    <MealTypes />
    </>
    )
}

export default Home;