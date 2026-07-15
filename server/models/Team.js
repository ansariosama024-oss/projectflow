import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      enum: [
        "Project Manager",
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "UI/UX Designer",
        "QA Engineer",
      ],
      default: "Frontend Developer",
    },

    department: {
      type: String,
      enum: [
        "Development",
        "Design",
        "Testing",
        "Management",
      ],
      default: "Development",
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Team", teamSchema);