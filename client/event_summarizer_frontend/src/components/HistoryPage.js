import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const HistoryPage = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/api/user/history', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const result = await response.json();

                if (response.ok) {
                    setHistory(result);
                } else {
                    setError(result.message || 'Error fetching history');
                }
            } catch (err) {
                setError('Error occurred while fetching history');
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    if (loading) return <p>Loading history...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className='w-screen overflow-x-hidden'>
            <Navbar />
            <div className='lg:px-24 px-3 w-full'>
                <h2 className='font-bold text-2xl mt-5'>History</h2>
                {history.length === 0 ? (
                    <p>No history available.</p>
                ) : (

                    history.map((item, index) => (
                        <div className='w-full'>
                            <div key={index} className=" border-2 mt-5 px-6 py-3 rounded-lg shadow-lg w-full">
                                <div className=''>
                                    <strong>File Name:</strong> {item.filename}
                                </div>
                                <div>
                                    <strong>Summary:</strong> {item.summaryText}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default HistoryPage;
