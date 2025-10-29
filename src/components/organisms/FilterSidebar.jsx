import { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Select from "@/components/atoms/Select";

const FilterSidebar = ({ onFilter, currentBoard }) => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "under-review", label: "Under Review" },
    { value: "planned", label: "Planned" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "rejected", label: "Rejected" }
  ];

  const sortOptions = [
    { value: "recent", label: "Most Recent" },
    { value: "votes", label: "Most Votes" },
    { value: "comments", label: "Most Comments" }
  ];

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    onFilter({ status, sortBy });
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    onFilter({ status: selectedStatus, sortBy: sort });
  };

  const clearFilters = () => {
    setSelectedStatus("");
    setSortBy("recent");
    onFilter({ status: "", sortBy: "recent" });
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <ApperIcon name="Filter" className="w-5 h-5 mr-2 text-primary" />
          Filters
        </h3>
        
        <div className="space-y-4">
          <div>
            <Select
              label="Status"
              value={selectedStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <Select
              label="Sort By"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>

          {(selectedStatus || sortBy !== "recent") && (
            <button
              onClick={clearFilters}
              className="w-full text-sm text-gray-600 hover:text-primary transition-colors flex items-center justify-center py-2"
            >
              <ApperIcon name="X" className="w-4 h-4 mr-1" />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Board Info */}
      <div className="pt-6 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Current Board</h4>
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-3">
          <p className="text-sm font-medium text-indigo-900 capitalize">
            {currentBoard?.replace("-", " ")}
          </p>
          <p className="text-xs text-indigo-600 mt-1">
            {currentBoard === "feature-requests" && "Suggest new features and improvements"}
            {currentBoard === "bug-reports" && "Report bugs and technical issues"}
            {currentBoard === "general" && "General feedback and suggestions"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;