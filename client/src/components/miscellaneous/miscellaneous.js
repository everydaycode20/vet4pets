

import Header from "./header";
import MiscControl from "./misc_control";
import MiscList from "./misc_list";

import "../../styles/miscellaneous/miscellaneous.scss"

const Miscellaneous = () => {
    


    return (
        <div className="main-misc-container">
            <Header />
            <MiscControl />
            <MiscList />
        </div>
    );

};

export default Miscellaneous;