
import { useParams } from "react-router-dom";

const PetProfile = () => {

    const {id} = useParams();

    return (
        <p>{id}</p>
    );
};

export default PetProfile;