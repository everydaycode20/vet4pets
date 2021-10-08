
import {container} from "../../styles/sidebar/menu.module.scss"

const Menu = ({ setShowSidebar }) => {

    return (
        <button className={container} onClick={() => setShowSidebar(true)}>
            <div/>
            <div/>
            <div/>
        </button>
    );

};

export default Menu;