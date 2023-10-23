import { useSelector } from "react-redux"
import "../styles/GreenCredits.css"

const GreenCredits = () => {

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    return (
        <div className="greenCredits">
            <h1>Your Green Credits</h1>
            <hr/>
            <div className="creditsContainer">
                <div className="left">
                    <div className="credits">
                        <h1>Green<br/>Credits</h1>
                        <div className="creditsSub">
                            <h1>{userInfo?userInfo.greenCredits:null}</h1>
                            <p>(1 credit ~ 0.05 rs)</p>
                        </div>
                    </div>
                    <div className="creditsInfo">
                        <h1>What are green credits?</h1>
                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. </p>
                        <h1>How to earn</h1>
                        <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. </p>
                    </div>
                </div>
                <div className="right">
                    {
                        userInfo?userInfo.greenCredits<300?<img src="/Seedling.png"/>:userInfo.greenCredits<600?<img src="/Shrub.png"/>:<img src="/Tree.png"/>:null
                    }
                </div>
            </div>
        </div>
    )
}

export default GreenCredits