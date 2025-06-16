import { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { getUserPerformance } from '../services/api';
import PropTypes from 'prop-types';

const PerformanceRadar = ({ userId }) => {
    const [performanceData, setPerformanceData] = useState(null);

    useEffect(() => {
        /**
         * Fonction asynchrone pour récupérer les données de performance
         * depuis l'API et les formater pour l'affichage
         */
        const fetchData = async () => {
            try {
                const data = await getUserPerformance(userId);
                // Transformation des données pour correspondre au format attendu par le graphique
                const formattedData = data.data.map(item => ({
                    subject: data.kind[item.kind], // Conversion des IDs en libellés
                    value: item.value // Valeur de performance
                }));
                setPerformanceData(formattedData);
            } catch (error) {
                console.error('Error fetching performance data:', error);
            }
        };

        fetchData();
    }, [userId]); // Relance l'effet si l'userId change

    // Affiche un message de chargement si les données ne sont pas encore disponibles
    if (!performanceData) return <div>Chargement...</div>;

    return (
        <div className="chart-card performance-radar">
            <ResponsiveContainer width="100%" height="100%">
                {/* Configuration du graphique radar */}
                <RadarChart 
                    cx="50%" 
                    cy="50%" 
                    outerRadius="65%" 
                    data={performanceData}
                >
                    {/* Grille du radar sans lignes radiales */}
                    <PolarGrid radialLines={false} />

                    {/* Axe des libellés avec style personnalisé */}
                    <PolarAngleAxis 
                        dataKey="subject" 
                        tick={{ fill: '#FFFFFF', fontSize: 12 }}
                    />
                    
                    {/* Configuration de la forme radar */}
                    <Radar 
                        name="Performance" 
                        dataKey="value" 
                        fill="#FF0101" 
                        fillOpacity={0.7} 
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

// Validation des props
PerformanceRadar.propTypes = {
    userId: PropTypes.number.isRequired
};

export default PerformanceRadar; 