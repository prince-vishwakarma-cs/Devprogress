import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation, useUpdateMutation } from "../redux/api/userAPI";
import { userExist, userNotExist } from "../redux/reducers/authSlice";
import toast from "react-hot-toast";

export const Userinfo = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [updateUser, { isLoading }] = useUpdateMutation();
  const avatarurl = user?.user?.avatar?.url || "";

  const [logoutUser, { isLoading: logoutLoading, error: logoutError }] =
    useLogoutMutation();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.user?.name || "",
    leetcode: user?.user?.platform_url?.leetcode || "",
    gfg: user?.user?.platform_url?.gfg || "",
    codeforces: user?.user?.platform_url?.codeforces || "",
    codechef: user?.user?.platform_url?.codechef || "",
    avatar: user?.user?.avatar || null,
  });

  useEffect(() => {
    if (!user?.user) {
      setFormData({
        name: "",
        leetcode: "",
        gfg: "",
        codeforces: "",
        codechef: "",
        avatar: null,
      });
    } else {
      setFormData({
        name: user?.user?.name || "",
        leetcode: user?.user?.platform_url?.leetcode || "",
        gfg: user?.user?.platform_url?.gfg || "",
        codeforces: user?.user?.platform_url?.codeforces || "",
        codechef: user?.user?.platform_url?.codechef || "",
        avatar: user?.user?.avatar || null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  const handleUpdate = async () => {
    const updateData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] && formData[key] !== "") {
        updateData.append(key, formData[key]);
      }
    });

    try {
      const { data, error } = await updateUser(updateData);
      if (data?.success) {
        dispatch(userExist({ user: data.user }));
        setEditing(false);
        toast.success(data.message);
      }
      if (error) {
        toast.error(error.data?.message);
      }
    } catch (error) {
      toast.error("An error occurred while updating the profile.");
    }
  };

  const handleLogout = async () => {
    try {
      const { data, error: logError } = await logoutUser();
      if (data?.success) {
        dispatch(userNotExist());
        toast.success(data.message);
      } else {
        toast.error(logError.data?.message);
      }
    } catch (error) {
      console.error("Logout Failed", error);
      toast.error(error?.message || "An error occurred while logging out.");
    }
  };

  return (
    <div className="!p-[1rem] max-w-lg mx-auto  h-full ">
      <h2 className="text-2xl font-bold mb-4">Profile Info</h2>
      <div className="space-y-4">
        <div className="flex flex-col items-center">
          {avatarurl && (
            <img
              src={avatarurl}
              alt="avatar"
              className="w-24 h-24 rounded-full object-cover"
            />
          )}
        </div>
        <div className="flex justify-between">
          <div className="text-accent bg-accent-bg !py-0.5 !px-2 rounded-full">
            {user?.user?._id}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`size-5 cursor-pointer ${editing ? "hidden" : "block"}`}
            onClick={() => setEditing(!editing)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </div>

        {editing && (
          <input type="file" className="w-full" onChange={handleFileChange} />
        )}

        {Object.keys(formData).map(
          (key) =>
            key !== "avatar" && (
              <div key={key} className="flex items-center gap-2 w-full">
                <label className="text-secondary w-32 capitalize">{key}</label>
                <div className="flex-1">
                  <input
                    type="text"
                    name={key}
                    className="w-full !px-4 !py-2 border border-bordercolor rounded-lg text-secondary-text focus:outline-none focus:ring-2 focus:ring-accent"
                    value={formData[key]}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </div>
              </div>
            )
        )}

        {editing && (
          <div className="flex gap-4">
            <button
              className="w-full mt-6 bg-accent text-background py-2 rounded-lg hover:bg-opacity-80 transition cursor-pointer"
              disabled={isLoading}
              onClick={handleUpdate}
            >
              {isLoading ? "Updating..." : "Save"}
            </button>
            <button
              className="w-full mt-6 text-accent py-2 rounded-lg hover:bg-opacity-80 transition border-3 border-accent cursor-pointer"
              onClick={() => {
                setFormData({
                  name: user?.user?.name || "",
                  leetcode: user?.user?.platform_url?.leetcode || "",
                  gfg: user?.user?.platform_url?.gfg || "",
                  codeforces: user?.user?.platform_url?.codeforces || "",
                  codechef: user?.user?.platform_url?.codechef || "",
                  avatar: user?.user?.avatar || null,
                });
                setEditing(false);
              }}
            >
              Reset
            </button>
          </div>
        )}

        {/* Logout Button */}
        <button
          className="w-full mt-6 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
          onClick={handleLogout}
          disabled={logoutLoading}
        >
          {logoutLoading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
};
