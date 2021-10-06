
import "../../styles/menu.scss"

const Menu = ({ setShowSidebar }) => {

    return (
        <button className="menu-container" onClick={() => setShowSidebar(true)}>
            <div/>
            <div/>
            <div/>
        </button>
    );

};

export default Menu;