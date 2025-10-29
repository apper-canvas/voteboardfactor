import { useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Select from "@/components/atoms/Select";
import { postService } from "@/services/api/postService";

const SubmitPostModal = ({ isOpen, onClose, onPostCreated, currentBoard }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    board: currentBoard || "feature-requests"
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const boardOptions = [
    { value: "feature-requests", label: "Feature Requests" },
    { value: "bug-reports", label: "Bug Reports" },
    { value: "general", label: "General" }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.trim().length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }
    
    if (!formData.board) {
      newErrors.board = "Please select a board";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);
      const newPost = await postService.create(formData);
      
      toast.success("Feedback submitted successfully!");
      setFormData({ title: "", description: "", board: currentBoard || "feature-requests" });
      setErrors({});
      onPostCreated(newPost);
      onClose();
    } catch (error) {
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Submit Feedback</h2>
            <p className="text-gray-600 text-sm mt-1">Share your ideas and help us improve</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ApperIcon name="X" className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Select
            label="Board"
            value={formData.board}
            onChange={(e) => handleChange("board", e.target.value)}
            error={errors.board}
          >
            {boardOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Input
            label="Title"
            placeholder="Summarize your feedback in a few words..."
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            error={errors.title}
          />

          <Textarea
            label="Description"
            placeholder="Describe your feedback in detail. What problem does it solve? How would it help?"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={6}
            error={errors.description}
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <ApperIcon name="Send" className="w-4 h-4 mr-2" />
                  Submit Feedback
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitPostModal;