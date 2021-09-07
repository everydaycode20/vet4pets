


const OwnerList = () => {

    const arr = [{"name": "name last name", "email": "example@example.com", "phoneNumber": ["8888-8888"], "address": "address", "registerDate": "01-01-01"},
                {"name": "name last name", "email": "example@example.com", "phoneNumber": ["8888-8888", "0000-0000"], "address": "address", "registerDate": "01-01-01"}];

    const categories = ["Name", "Email", "Phone Number", "Address", "Register Date"];

    return (
        <section className="main-owner-list-container">
            <ul className="categories-list">
                {categories.map((elm, index) => {

                    return (
                        <li>{elm}</li>
                    )
                })}
            </ul>
            <ul className="owner-list">

                {arr.map((elm, index) => {

                    return (
                        <li key={index} className="item-list">
                            <div className="checkbox">
                                <input type="checkbox" />
                            </div>
                            <span>{elm.name}</span>
                            <span>{elm.email}</span>
                            <span>{elm.phoneNumber.length > 1 ? `${elm.phoneNumber.length} phones` : elm.phoneNumber}</span>
                            <span>{elm.address}</span>
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

export default OwnerList;