import PropTypes from 'prop-types';

const MacroCard = ({ icon, value, unit, type, bgColor }) => {
    return (
        <div className="macro-card">
            <div className="macro-icon" style={{ backgroundColor: bgColor }}>
                <img src={icon} alt={type} />
            </div>
            <div className="macro-info">
                <h3>{value}{unit}</h3>
                <p>{type}</p>
            </div>
        </div>
    );
};

MacroCard.propTypes = {
    icon: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    unit: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired
};

export default MacroCard; 