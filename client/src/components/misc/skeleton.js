import "../../styles/skeleton.scss";
import PropTypes from 'prop-types'
/**
 * 
 * @param {Number} height 
 * 
 * @param {String} backgroundColor HEX color
 * 
 * @param {Number} number number of items to render
 * 
 * @param {Number} width width percentage
 * 
 */

const Skeleton = ( { height, backgroundColor, number, width } ) => {

    return (
        <ul className="skeleton" style={{width: `${width}%`}}>
            {Array.from("x".repeat(number)).map((elm, index) => {

                return <li key={index} style={{height: `${height}px`, backgroundColor: backgroundColor}}></li>
            })}
        </ul>
    );
};

Skeleton.propTypes = {
    height: PropTypes.number,
    backgroundColor: PropTypes.string,
    number: PropTypes.number,
    width: PropTypes.number
};

export default Skeleton;