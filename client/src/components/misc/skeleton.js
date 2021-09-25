import "../../styles/skeleton.scss";

/**
 * 
 * @param {Number} height 
 * 
 * @param {String} backgroundColor HEX color
 * 
 * @param {Number} number number of items to render
 * 
 * @param {Number} number width percentage
 * 
 */

const Skeleton = ( props ) => {

    return (
        <ul className="skeleton" style={{width: `${props.width}%`}}>
            {Array.from("x".repeat(props.number)).map((elm, index) => {

                return <li key={index} style={{height: `${props.height}px`, backgroundColor: props.backgroundColor}}></li>
            })}
        </ul>
    );
};

export default Skeleton;