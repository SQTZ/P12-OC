import { useState, useEffect } from 'react';
import { getUserMainData } from '../services/api';
import MacroCard from './MacroCard';
import caloriesIcon from '../assets/flamme.svg';
import proteinIcon from '../assets/chicken.svg';
import carbsIcon from '../assets/apple.svg';
import fatIcon from '../assets/cheeseburger.svg';
import PropTypes from 'prop-types';

const MacrosList = ({ userId }) => {
    const [macrosData, setMacrosData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserMainData(userId);
                setMacrosData(data.keyData);
            } catch (error) {
                console.error('Error fetching macros data:', error);
            }
        };

        fetchData();
    }, [userId]);

    if (!macrosData) return <div>Chargement...</div>;

    const macros = [
        {
            icon: caloriesIcon,
            value: macrosData.calorieCount.toLocaleString(),
            unit: 'kCal',
            type: 'Calories',
            bgColor: 'rgba(255, 0, 0, 0.1)'
        },
        {
            icon: proteinIcon,
            value: macrosData.proteinCount,
            unit: 'g',
            type: 'Protéines',
            bgColor: 'rgba(74, 184, 255, 0.1)'
        },
        {
            icon: carbsIcon,
            value: macrosData.carbohydrateCount,
            unit: 'g',
            type: 'Glucides',
            bgColor: 'rgba(249, 206, 35, 0.1)'
        },
        {
            icon: fatIcon,
            value: macrosData.lipidCount,
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

export default MacrosList; 