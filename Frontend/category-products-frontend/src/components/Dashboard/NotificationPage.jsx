// NotificationList.jsx
import { useEffect, useState } from 'react';
import NotificationCard from '../UI/NotificationCard';
import { getAllLoanById } from '../../services/userService';
import { toast } from 'react-toastify';

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [userId, setUserId] = useState(1);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await getAllLoanById(userId);
                console.log("response", response);
                if (response.status == 200) {
                    toast.success('Query submitted successfully!');
                    setNotifications(response.data);
                }
            } catch (error) {
                console.error('Error submitting query:', error);
                toast.error('Error submitting query. Please try again.');
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-800"></h2>
            {notifications.length === 0 ? (
                <p className="text-center text-gray-500">No notifications available.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {notifications.map((notif, index) => (
                        <NotificationCard key={index} notification={notif} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotificationPage;
