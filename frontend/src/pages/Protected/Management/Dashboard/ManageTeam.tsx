import React, { useEffect, useState } from "react";
import DashWrapper from "./DashWrapper";
import { api, handleError } from "../../../../utils/axios";
import { UserDTO } from "../../../../components/interface";
import toast from "react-hot-toast";

const ManageTeam = () => {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [viewedUser, setViewedUser] = useState<UserDTO | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const getAllMembers = async () => {
    try {
      const { data } = await api.get("/api/v1/user/get-all-users");
      if (data?.success) {
        setUsers(data?.users);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const updatingUserRole = async () => {
    try {
      const { data } = await api.put(
        `/api/v1/user/update-user-role/                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  :${viewedUser?._id}`,
        {
          role: selectedRole,
        }
      );
      if (data?.success) {
        toast.success("Updated SuccessFully");
        setViewedUser(null);
      }
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    getAllMembers();
  }, []);

  const adminAndManagerUsers = users.filter(
    (user) => user.role === "admin" || user.role === "manager"
  );
  const otherUsers = users.filter(
    (user) => user.role !== "admin" && user.role !== "manager"
  );

  const handleViewDetails = (user: UserDTO) => {
    setViewedUser(user);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <DashWrapper>
      <div className="flex flex-col items-center w-full p-6">
        <p className="text-4xl font-heading font-bold mb-8 text-center">
          Manage Team
        </p>

        {/* Admin and Manager Users Section */}
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mb-8">
          <p className="text-2xl font-semibold mb-4 text-center">
            Admins and Managers
          </p>
          <div className="hidden lg:grid grid-cols-4 gap-4 border-b-2 pb-2 mb-4">
            <p className="font-semibold text-lg">Name</p>
            <p className="font-semibold text-lg">Email</p>
            <p className="font-semibold text-lg">Role</p>
            <p className="font-semibold text-lg text-center">Actions</p>
          </div>
          {adminAndManagerUsers.map((user, index) => (
            <div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-4 gap-4 py-2 border-b last:border-none items-center"
            >
              <p className="text-gray-700 hidden lg:block">{user?.name}</p>
              <p className="text-gray-700">{user?.email}</p>
              <p className="text-gray-700 hidden lg:block">{user?.role}</p>
              <div className="flex justify-center lg:justify-start gap-2">
                <button
                  className="bg-green-500 text-primary py-1 px-3 rounded hover:bg-green-600"
                  onClick={() => handleViewDetails(user)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>

        <hr className="w-full max-w-4xl border-gray-300 mb-8" />

        {/* All Other Users Section */}
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
          <p className="text-2xl font-semibold mb-4 text-center">All Users</p>
          <div className="hidden lg:grid grid-cols-4 gap-4 border-b-2 pb-2 mb-4">
            <p className="font-semibold text-lg">Name</p>
            <p className="font-semibold text-lg">Email</p>
            <p className="font-semibold text-lg">Role</p>
            <p className="font-semibold text-lg text-center">Actions</p>
          </div>
          {otherUsers.map((user, index) => (
            <div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-4 gap-4 py-2 border-b last:border-none items-center"
            >
              <p className="text-gray-700 hidden lg:block">{user?.name}</p>
              <p className="text-gray-700">{user?.email}</p>
              <p className="text-gray-700 hidden lg:block">{user?.role}</p>
              <div className="flex justify-center lg:justify-start gap-2">
                <button
                  className="bg-green-500 text-primary py-1 px-3 rounded hover:bg-green-600"
                  onClick={() => handleViewDetails(user)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Dialog for Viewing and Editing User Details */}
        {viewedUser && (
          <div
            className={`fixed inset-0 flex items-center justify-center z-50 ${
              isDialogOpen ? "" : "hidden"
            }`}
          >
            <div className="bg-gray-800 bg-opacity-75 absolute inset-0"></div>
            <div className="bg-white p-6 rounded-lg z-10 max-w-md shadow-lg">
              <p className="text-xl font-semibold mb-4">
                Viewing/Editing Details
              </p>
              <p>Name: {viewedUser.name}</p>
              <p>Email: {viewedUser.email}</p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Select Role:
                </label>
                <select
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="customer">Customer</option>
                </select>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-blue-500 text-primary py-1 px-3 rounded hover:bg-blue-600"
                  onClick={handleCloseDialog}
                >
                  Close
                </button>
                <button
                  className="bg-green-500 text-primary py-1 px-3 rounded hover:bg-green-600 ml-2"
                  onClick={updatingUserRole}
                >
                  Edit Role
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashWrapper>
  );
};

export default ManageTeam;
