import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getUserAverageSessions } from '../services/api';
import AverageSessions from './AverageSessions';

/**
 * Composant UserAverageSessions : Page d'affichage des sessions moyennes
 * Utilise le composant AverageSessions pour le graphique et affiche les statistiques moyennes
 */
const UserAverageSessions = () => {
    const { id } = useParams();
    const userId = parseInt(id);
    const [sessionsData, setSessionsData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserAverageSessions(userId);
                const formattedData = data.sessions.map(session => ({
                    name: session.day,
                    value: session.sessionLength
                }));
                setSessionsData(formattedData);
            } catch (error) {
                setError('Erreur lors de la récupération des données de sessions');
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    // Redirection vers un utilisateur par défaut si l'ID n'est pas valide
    if (isNaN(userId) || userId < 0) {
        return <Navigate to="/user/12/average-sessions" />;
    }

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;
    if (!sessionsData) return <div>Aucune donnée de sessions trouvée</div>;

    const averageSessionLength = Math.round(
        sessionsData.reduce((acc, curr) => acc + curr.value, 0) / sessionsData.length
    );

    return (
        <div className="average-sessions-page">
            <h1>Durée moyenne des sessions</h1>
            <div className="sessions-stats">
                <div className="session-stat">
                    <h3>Durée moyenne</h3>
                    <p>{averageSessionLength} min</p>
                </div>
            </div>
            <div className="chart-container">
                <AverageSessions userId={userId} />
            </div>
        </div>
    );
};

export default UserAverageSessions; 