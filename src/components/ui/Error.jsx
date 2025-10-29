import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <ApperIcon name="AlertCircle" className="w-8 h-8 text-red-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-600">{message}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
          >
            <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default Error;