
import Header from "./header";
import OwnerControl from "./owner_controls";
import OwnerList from "./owner_list";

import "../../styles/owner/owner.scss";

const Owner = () => {
    
    return (
        <div className="main-owner-container">
            <Header />
            <OwnerControl />
            <OwnerList />
        </div>
    );
}

export default Owner;