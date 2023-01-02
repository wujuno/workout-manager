import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";


function NotFound () {
    
    return (
        
        <div>
            <h1>Pages Not Found</h1>
            <Link to="/">
                <h2>Go Home</h2>
            </Link>
        </div>
        
    )
}

export default NotFound;