import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
          <ApperIcon name="Search" className="w-12 h-12 text-white" />
        </div>
        
        <div>
          <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
          <p className="text-gray-600 leading-relaxed">
            Sorry, the page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>

        <div className="space-y-3">
          <Button onClick={() => navigate("/")} className="w-full">
            <ApperIcon name="Home" className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)} 
            className="w-full"
          >
            <ApperIcon name="ArrowLeft" className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? Try searching for feedback or submit a new request.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;