import Badge from "@/components/atoms/Badge";

const StatusBadge = ({ status }) => {
  const statusLabels = {
    "under-review": "Under Review",
    "planned": "Planned",
    "in-progress": "In Progress",
    "completed": "Completed",
    "rejected": "Rejected"
  };

  return (
    <Badge variant={status}>
      {statusLabels[status] || status}
    </Badge>
  );
};

export default StatusBadge;