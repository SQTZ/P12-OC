import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getUserMainData } from '../services/api';
import DailyActivity from './DailyActivity';
import MacrosList from './MacrosList';
import AverageSessions from './AverageSessions';
import PerformanceRadar from './PerformanceRadar';
import ScoreChart from './ScoreChart';

export default function ContainerHome() {
    const { id } = useParams();
    const userId = parseInt(id);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getUserMainData(userId);
                setUserData(data);
            } catch (err) {
                setError('Erreur lors de la récupération des données');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    // Vérification de l'ID valide
    if (isNaN(userId) || userId < 0) {
        return <Navigate to="/user/12" />;
    }

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;
    if (!userData) return <div>Aucune donnée trouvée</div>;

    return (
        <>
            <div className="container-home">
                <h1>Bonjour <span className="name">{userData.userInfos.firstName}</span></h1>
                <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
            </div>
            
            <div className="container-content">
                <div className="container-content-left">
                    <DailyActivity userId={userId} />
                    <div className="charts-row">
                        <AverageSessions userId={userId} />
                        <PerformanceRadar userId={userId} />
                        <ScoreChart score={userData.todayScore || userData.score} />
                    </div>
                </div>
                <div className="container-content-right">
                    <MacrosList userId={userId} />
                </div>
            </div>
        </>
    );
}