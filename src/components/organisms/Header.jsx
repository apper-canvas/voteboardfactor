import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";

const Header = ({ onSubmitClick, onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Feature Requests", path: "/", board: "feature-requests" },
    { name: "Bug Reports", path: "/bug-reports", board: "bug-reports" },
    { name: "General", path: "/general", board: "general" },
    { name: "Roadmap", path: "/roadmap" }
  ];

  const isActiveTab = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname === path) return true;
    return false;
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <ApperIcon name="MessageSquare" className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">VoteBoard</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`px-3 py-2 text-sm font-medium transition-colors border-b-2 ${
                    isActiveTab(item.path)
                      ? "text-primary border-primary"
                      : "text-gray-600 hover:text-primary border-transparent hover:border-gray-300"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Search and Submit Button */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block w-64">
              <SearchBar onSearch={onSearch} />
            </div>
            <Button onClick={onSubmitClick} size="small">
              <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
              Submit
            </Button>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ApperIcon 
                name={isMobileMenuOpen ? "X" : "Menu"} 
                className="w-5 h-5 text-gray-600" 
              />
            </button>
          </div>
        </div>
        
        {/* Mobile Search */}
        <div className="sm:hidden pb-3">
          <SearchBar onSearch={onSearch} />
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActiveTab(item.path)
                    ? "text-primary bg-indigo-50"
                    : "text-gray-600 hover:text-primary hover:bg-gray-50"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;