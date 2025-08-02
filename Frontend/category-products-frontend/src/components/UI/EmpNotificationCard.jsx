import React, { useState } from 'react';

const NotificationCardWithResponse = ({ notification, onResponseSubmit }) => {
  const {
    id,
    title,
    message,
    response,
    notificationType,
    expiresAt,
    read,
  } = notification;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseText, setResponseText] = useState('');
  const isExpired = expiresAt && new Date(expiresAt) < new Date();

  const handleSubmit = async () => {
    if (!responseText.trim()) return;
    await onResponseSubmit(id, responseText);
    setIsModalOpen(false);
    setResponseText('');
  };

  return (
    <div
      className={`w-full max-w-sm rounded-2xl p-5 shadow-lg transition duration-300 ${
        read ? 'bg-gray-100 hover:shadow-md' : 'bg-blue-50 hover:shadow-md'
      }`}
    >
      <div className="mb-3">
        <h3 className="text-xs text-blue-800 mb-1">📌 Title: {title}</h3>
        <p className="text-gray-700 text-sm">💬 Message: {message}</p>
      </div>

      {response ? (
        <div className="mt-4 bg-white border-l-4 border-green-500 p-3 rounded-md shadow-inner text-sm text-green-800">
          <strong>📝 Response:</strong> {response}
        </div>
      ) : isExpired ? (
        <div className="text-red-500 mt-2 text-sm font-semibold">⚠️ Expired</div>
      ) : (
        <button
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
          onClick={() => setIsModalOpen(true)}
        >
          ✏️ Send Response
        </button>
      )}

      <div className="mt-5 text-xs text-gray-500 flex justify-between items-center border-t pt-2">
        <span>🔖 Type: {notificationType}</span>
        <span>⏰ {expiresAt ? new Date(expiresAt).toLocaleString() : 'N/A'}</span>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                Respond to Query #{id}
              </h3>
              <textarea
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                placeholder="Type your response here..."
                className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-800 focus:outline-none mb-4"
                autoFocus
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setResponseText('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!responseText.trim()}
                  className={`px-4 py-2 rounded-lg text-white font-medium transition ${
                    responseText.trim()
                      ? 'bg-blue-800 hover:bg-blue-900'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Send Response
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCardWithResponse;
