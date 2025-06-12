import PropTypes from 'prop-types';
import caloriesIcon from '../assets/flamme.svg';
import proteinIcon from '../assets/chicken.svg';
import carbsIcon from '../assets/apple.svg';
import fatIcon from '../assets/cheeseburger.svg';
import { useState, useEffect } from 'react';
import { getUserMainData } from '../services/api';

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


const MacrosList = ({ userId }) => {
    const [userData, setUserData] = useState(null);

    const formatNumber = (num) => {
        return num >= 1000 ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : num;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserMainData(userId);
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, [userId]);

    if (!userData) return null;

    const macros = [
        {
            icon: caloriesIcon,
            value: formatNumber(userData.keyData.calorieCount),
            unit: 'kCal',
            type: 'Calories',
            bgColor: 'rgba(255, 0, 0, 0.1)'
        },
        {
            icon: proteinIcon,
            value: userData.keyData.proteinCount,
            unit: 'g',
            type: 'Protéines',
            bgColor: 'rgba(74, 184, 255, 0.1)'
        },
        {
            icon: carbsIcon,
            value: userData.keyData.carbohydrateCount,
            unit: 'g',
            type: 'Glucides',
            bgColor: 'rgba(249, 206, 35, 0.1)'
        },
        {
            icon: fatIcon,
            value: userData.keyData.lipidCount,
            unit: 'g',
            type: 'Lipides',
            bgColor: 'rgba(253, 81, 129, 0.1)'
        }
    ];

    return (
        <div className="macros-list">
            {macros.map((macro, index) => (
                <MacroCard key={index} {...macro} />
            ))}
        </div>
    );
};

MacrosList.propTypes = {
    userId: PropTypes.number.isRequired
};

MacroCard.propTypes = {
    icon: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    unit: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired
};

export default MacrosList; 