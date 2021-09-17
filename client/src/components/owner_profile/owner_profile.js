
import { useParams } from "react-router-dom";

const OwnerProfile = () => {

    const {id} = useParams();

    return (
        <p>{id}</p>
    );
};

export default OwnerProfile;