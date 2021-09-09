


const PetList = () => {

    const arr = [{"name": "pet name", "ownerName": "owner name", "age": 10, "type": "dog", "registerDate": "01-01-01"},
                {"name": "pet name", "ownerName": "owner name", "age": 10, "type": "cat", "registerDate": "01-01-01"}];

    const categories = ["Name", "Owner Name", "Age", "Type", "Register Date"];

    return (
        <section className="main-pet-list-container">
            <ul className="categories-list">
                {categories.map((elm, index) => {

                    return (
                        <li key={index}>{elm}</li>
                    )
                })}
            </ul>
            <ul className="pet-list">

                {arr.map((elm, index) => {

                    return (
                        <li key={index} className="item-list">
                            <div className="checkbox">
                                <input type="checkbox" />
                            </div>
                            <span>{elm.name}</span>
                            <span>{elm.ownerName}</span>
                            <span>{elm.age}</span>
                            <span>{elm.type}</span>
                            <span>{elm.registerDate}</span>
                            <button className="dot-container">
                                <div className="dot"/>
                                <div className="dot"/>
                                <div className="dot"/>
                            </button>
                        </li>
                    )
                })}
            </ul>
            
        </section>
    );
};

export default PetList;