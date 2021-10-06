import ImagePicker from "./image-picker-container";
import PropTypes from 'prop-types'

const ColorPicker = ({ colorCode=true, setColor }) => {

    return (
        <ImagePicker colorCode={colorCode} setColor={setColor} />
    );
};

ColorPicker.propTypes = {
    colorCode: PropTypes.bool
};

export default ColorPicker;