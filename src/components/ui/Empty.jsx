import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No feedback yet", 
  description = "Be the first to share an idea!",
  actionText = "Submit Feedback",
  onAction
}) => {
  return (
    <div className="text-center py-16 px-4">
      <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-6">
        <ApperIcon name="MessageSquare" className="w-12 h-12 text-indigo-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
          {actionText}
        </button>
      )}
    </div>
  );
};

export default Empty;