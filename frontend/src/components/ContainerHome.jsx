import { useState, useEffect } from 'react';
import { getUserMainData } from '../services/api';
import DailyActivity from './DailyActivity';
import MacrosList from './MacrosList';
import AverageSessions from './AverageSessions';
import PerformanceRadar from './PerformanceRadar';
import ScoreChart from './ScoreChart';

const USER_ID = 12; // Centralisation de l'ID utilisateur

export default function ContainerHome() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getUserMainData(USER_ID);
                setUserData(data);
            } catch (err) {
                setError('Erreur lors de la récupération des données');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;
    if (!userData) return <div>Aucune donnée trouvée</div>;

    return (
        <>
            <div className="container-home">
                <h1>Bonjour <span className="name">{userData.userInfos.firstName}</span></h1>
                <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
            </div>
            
            <div className="container-content">
                <div className="container-content-left">
                    <DailyActivity userId={USER_ID} />
                    <div className="charts-row">
                        <AverageSessions userId={USER_ID} />
                        <PerformanceRadar userId={USER_ID} />
                        <ScoreChart score={userData.todayScore || userData.score} />
                    </div>
                </div>
                <div className="container-content-right">
                    <MacrosList userId={USER_ID} />
                </div>
            </div>
        </>
    );
}