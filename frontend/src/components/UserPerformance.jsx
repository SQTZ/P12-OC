import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getUserPerformance } from '../services/api';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

const UserPerformance = () => {
    const { id } = useParams();
    const userId = parseInt(id);
    const [performanceData, setPerformanceData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserPerformance(userId);
                const formattedData = data.data.map(item => ({
                    subject: data.kind[item.kind],
                    value: item.value
                }));
                setPerformanceData(formattedData);
            } catch (error) {
                setError('Erreur lors de la récupération des données de performance');
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    // Vérification de l'ID valide
    if (isNaN(userId) || userId < 0) {
        return <Navigate to="/user/12/performance" />;
    }

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;
    if (!performanceData) return <div>Aucune donnée de performance trouvée</div>;

    // Calculer les statistiques moyennes
    const averagePerformance = Math.round(
        performanceData.reduce((acc, curr) => acc + curr.value, 0) / performanceData.length
    );

    return (
        <div className="performance-page">
            <h1>Performance par type d&apos;activité</h1>
            <div className="performance-stats">
                <div className="performance-stat">
                    <h3>Performance moyenne</h3>
                    <p>{averagePerformance} points</p>
                </div>
            </div>
            <div className="chart-container">
                <div className="chart-card performance-radar">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart 
                            cx="50%" 
                            cy="50%" 
                            outerRadius="65%" 
                            data={performanceData}
                        >
                            <PolarGrid radialLines={false} />
                            <PolarAngleAxis 
                                dataKey="subject" 
                                tick={{ fill: '#FFFFFF', fontSize: 12 }}
                            />
                            <Radar 
                                name="Performance" 
                                dataKey="value" 
                                fill="#FF0101" 
                                fillOpacity={0.7} 
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default UserPerformance; 