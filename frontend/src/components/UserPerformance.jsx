import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getUserPerformance } from '../services/api';
import PerformanceRadar from './PerformanceRadar';

/**
 * Composant UserPerformance : Page d'affichage des performances
 * Utilise le composant PerformanceRadar pour le graphique et affiche les statistiques moyennes
 */
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

    // Redirection vers un utilisateur par défaut si l'ID n'est pas valide
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
                <PerformanceRadar userId={userId} />
            </div>
        </div>
    );
};

export default UserPerformance; 