import React from 'react';

const NotificationCard = ({ notification }) => {
  const {
    title,
    message,
    response,
    notificationType,
    expiresAt,
    read,
  } = notification;

  return (
    <div
      className={`w-full max-w-sm rounded-2xl p-5 shadow-lg transition duration-300 ${
        read ? 'bg-gray-100 hover:shadow-md' : 'bg-blue-50 hover:shadow-md'
      }`}
    >
      <div className="mb-3">
        <h3 className="text-xl text-blue-800 mb-1">
           Title: {title}
        </h3>
        <p className="text-gray-700 text-sm">💬 Message: {message}</p>
      </div>

      {response && (
        <div className="mt-4 bg-white border-l-4 border-blue-400 p-3 rounded-md shadow-inner text-sm text-blue-800">
          <strong> Response:</strong> {response}
        </div>
      )}

      <div className="mt-5 text-xs text-gray-500 flex justify-between items-center border-t pt-2">
        <span> Type: {notificationType}</span>
        <span> {expiresAt ? new Date(expiresAt).toLocaleString() : 'N/A'}</span>
      </div>
    </div>
  );
};

export default NotificationCard;
