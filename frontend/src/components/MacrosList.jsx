import PropTypes from 'prop-types';
import caloriesIcon from '../assets/flamme.svg';
import proteinIcon from '../assets/chicken.svg';
import carbsIcon from '../assets/apple.svg';
import fatIcon from '../assets/cheeseburger.svg';
import { useState, useEffect } from 'react';
import { getUserMainData } from '../services/api';

/**
 * Composant MacroCard : Affiche une carte pour un macro-nutriment spécifique
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.icon - L'URL de l'icône du macro-nutriment
 * @param {number|string} props.value - La valeur numérique du macro-nutriment
 * @param {string} props.unit - L'unité de mesure (g, kCal)
 * @param {string} props.type - Le type de macro-nutriment (Calories, Protéines, etc.)
 * @param {string} props.bgColor - La couleur de fond de l'icône
 */
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

/**
 * Composant MacrosList : Affiche la liste des macro-nutriments d'un utilisateur
 * @param {Object} props - Les propriétés du composant
 * @param {number} props.userId - L'identifiant de l'utilisateur
 */
const MacrosList = ({ userId }) => {
    // État pour stocker les données de l'utilisateur
    const [userData, setUserData] = useState(null);

    /**
     * Formate un nombre en ajoutant des virgules pour les milliers
     * @param {number} num - Le nombre à formater
     * @returns {string} Le nombre formaté
     */
    const formatNumber = (num) => {
        return num >= 1000 ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : num;
    };

    // useEffect pour récupérer les données de l'utilisateur au chargement
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

    // Configuration des données pour chaque macro-nutriment
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

    // Rendu de la liste des macro-nutriments
    return (
        <div className="macros-list">
            {macros.map((macro, index) => (
                <MacroCard key={index} {...macro} />
            ))}
        </div>
    );
};

// Validation des Props
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