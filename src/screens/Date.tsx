import { Outlet, useParams } from "react-router-dom";


function Date() {
    const {date} = useParams();
    return (
        <div>
        {date}
        <Outlet/>
        </div>
    )
    
}

export default Date;