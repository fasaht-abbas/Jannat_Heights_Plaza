import React, { useEffect, useRef, useState } from "react";
import DashWrapper from "./DashWrapper";
import Button from "../../../../components/reuseables/Button";
import { FaPen } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { handleError, protectedApi } from "../../../../utils/axios";
import toast from "react-hot-toast";
import { AssetDTO } from "../../../../components/interface";
import { HiDotsVertical } from "react-icons/hi";
import Loading from "../../../../components/reuseables/Loading";

const ManageApartment = () => {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [existing, setExisting] = useState<AssetDTO[]>([]);
  const [ehompage, setEhomepage] = useState<AssetDTO[]>([]);
  const [viewDotMenu, setViewDotMenu] = useState("");

  const [checked, setChecked] = useState<string[]>([]);
  const [openDelete, setOpenDelete] = useState(false);
  const newFilesRef = useRef<HTMLInputElement>(null);
  const AssetViewClasses = " relative w-[24vw] h-[30vh] overflow-hidden";

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (selected) {
      const selectedArray = Array.from(selected);
      setSelectedFiles([...selectedFiles, ...selectedArray]);
    }
  };

  const onClickEdit = () => {
    if (editMode) {
      setEditMode(false);
      setSelectedFiles([]);
      setChecked([]);
      setViewDotMenu("");
    } else {
      setEditMode(true);
    }
  };
  // for fetching the existing assets
  const fetchAssets = async () => {
    setLoading(true);
    try {
      const { data } = await protectedApi.get(
        "/api/v1/asset/get-all-apart-assets"
      );

      if (data.success) {
        setExisting(data?.AllExceptHomepage);
        setEhomepage(data?.homepage);

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  };

  //for applying the changes
  const onApply = async () => {
    setLoading(true);

    try {
      const formdata = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formdata.append("files", selectedFiles[i]);
      }
      const { data } = await protectedApi.post(
        "/api/v1/asset/update-apartment",
        formdata
      );
      if (data?.success) {
        setLoading(false);
        setSelectedFiles([]);
        setEditMode(false);

        toast.success("Updated Successfully");
        fetchAssets();
      }
    } catch (error) {
      setLoading(false);

      handleError(error);
    }
  };

  //deleting the assets
  const deleteAssets = async () => {
    try {
      setLoading(true);
      const { data } = await protectedApi.post("/api/v1/asset/delete", checked);
      if (data?.success) {
        toast.success("deleted successfuly");
        fetchAssets();
        setOpenDelete(false);
        setLoading(false);
        setChecked([]);
      }
    } catch (error) {
      handleError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const setOnHomepageAsset = async (id: string) => {
    try {
      setLoading(true);
      const { data } = await protectedApi.put("/api/v1/asset/set-on-homepage", {
        id: id,
      });
      if (data?.success) {
        setViewDotMenu("");
        fetchAssets();
        setLoading(false);
        toast.success("Successfully set on hompage");
      }
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  };

  const removeFromHomepage = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await protectedApi.put(
        "/api/v1/asset/remove-from-hompage",
        {
          id: id,
        }
      );
      if (data?.success) {
        toast.success("removed from hompage");
        fetchAssets();
        setLoading(false);
        setViewDotMenu("");
      }
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  };

  return (
    <DashWrapper>
      {" "}
      <div className=" p-[2vh] flex gap-4 w-full text-center items-center justify-center ">
        <p className=" text-3xl font-heading font-bold">Manage Appartments</p>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-3 relative px-[3vw] ">
          <p className="font-main   text-3xl  text-accent text-center w-full">
            {" "}
            Already uploaded
          </p>
          <p className="font-main   text-xl  text-accent  w-full">
            {" "}
            Set on homepage
          </p>
          <div className=" flex flex-wrap gap-3">
            {ehompage?.length ? (
              ehompage.map((file) => {
                const isVideo = file?.type === "video";

                return (
                  <div className={`${AssetViewClasses} `}>
                    {isVideo ? (
                      <video className=" size-full rounded-sm" controls>
                        <source src={file.link} />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        className="   size-full rounded-sm"
                        src={file.link}
                      />
                    )}
                    {editMode ? (
                      <>
                        <input
                          title="Select"
                          type="checkbox"
                          id="myCheckbox"
                          checked={checked.includes(file?._id)}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            if (e.target.checked) {
                              setChecked([...checked, file._id]);
                            } else {
                              setChecked(
                                checked.filter((f) => f !== file?._id)
                              );
                            }
                          }}
                          className=" accent-primary size-4 absolute left-3 top-3"
                        />
                        <button
                          className="absolute right-3 top-3"
                          onClick={() => {
                            if (viewDotMenu === file._id) {
                              setViewDotMenu("");
                            } else setViewDotMenu(file._id);
                          }}
                        >
                          <span className="text-gray-500">
                            <HiDotsVertical className="text-white" />
                          </span>
                          {viewDotMenu == file._id ? (
                            <Button
                              onClick={() => removeFromHomepage(file._id)}
                              className=" border-secondary border-opacity-25  border-2 transition-all w-[12vw] bg-white  text-secondary absolute right-0 top-4"
                            >
                              remove from homepage
                            </Button>
                          ) : (
                            ""
                          )}
                        </button>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })
            ) : editMode ? (
              <p className=" font-main text-2xl">Add relevent Photos/videos</p>
            ) : (
              <p className=" font-main text-2xl">No photos/videos Added</p>
            )}
          </div>
          <p className="font-main   text-xl  text-accent  w-full">
            {" "}
            Not set on Homepage
          </p>
          <div className=" flex flex-wrap gap-3">
            {existing?.length ? (
              existing.map((file) => {
                const isVideo = file?.type === "video";

                return (
                  <div className={`${AssetViewClasses} `}>
                    {isVideo ? (
                      <video className=" size-full rounded-sm" controls>
                        <source src={file.link} />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        className="   size-full rounded-sm"
                        src={file.link}
                      />
                    )}
                    {editMode ? (
                      <>
                        <input
                          title="Select"
                          type="checkbox"
                          id="myCheckbox"
                          checked={checked.includes(file?._id)}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            if (e.target.checked) {
                              setChecked([...checked, file._id]);
                            } else {
                              setChecked(
                                checked.filter((f) => f !== file?._id)
                              );
                            }
                          }}
                          className=" accent-primary size-4 absolute left-3 top-3"
                        />
                        <button
                          className="absolute right-3 top-3"
                          onClick={() => {
                            if (viewDotMenu === file._id) {
                              setViewDotMenu("");
                            } else setViewDotMenu(file._id);
                          }}
                        >
                          <span className="text-gray-500">
                            <HiDotsVertical className="text-white" />
                          </span>
                          {viewDotMenu == file._id ? (
                            <Button
                              onClick={() => setOnHomepageAsset(file._id)}
                              className=" border-secondary border-opacity-25  border-2 transition-all w-40 bg-white  text-secondary absolute right-0 top-4"
                            >
                              set on Homepage
                            </Button>
                          ) : (
                            ""
                          )}
                        </button>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })
            ) : editMode ? (
              <p className=" font-main text-2xl">Add relevent Photos/videos</p>
            ) : (
              <p className=" font-main text-2xl">No photos/videos Added</p>
            )}
          </div>
          {/* previewing the photos to be uploaded */}
          <div className="flex flex-wrap gap-3">
            {selectedFiles.length > 0 ? (
              <p className="font-main   text-3xl  text-accent text-center w-full">
                {" "}
                Previewing new
              </p>
            ) : (
              ""
            )}

            {selectedFiles.map((file) => {
              const isVideo = file.type.startsWith("video/");

              return (
                <div className={`${AssetViewClasses} `}>
                  {isVideo ? (
                    <video className=" size-full rounded-sm" controls>
                      <source
                        src={URL.createObjectURL(file)}
                        type={file.type}
                      />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      className="   size-full rounded-sm"
                      src={URL.createObjectURL(file)}
                    />
                  )}
                  <Button
                    className=" absolute top-2 right-1 bg-white bg-opacity-20"
                    onClick={() => {
                      setSelectedFiles(selectedFiles.filter((f) => f !== file));
                    }}
                  >
                    X
                  </Button>
                </div>
              );
            })}
            {editMode ? (
              <Button
                variant="primary"
                className={`${AssetViewClasses}  bg-opacity-5 hover:bg-opacity-10 text-primary items-center`}
                onClick={() => {
                  newFilesRef.current?.click();
                }}
              >
                <CiCirclePlus className=" size-1/3" />
                <p className=" text-primary font-accent text-sm">
                  add photo/video
                </p>
              </Button>
            ) : (
              ""
            )}
          </div>

          <div className=" mt-4 flex gap-3 justify-end pr-[3vh] mb-[3vh]">
            <Button
              variant="primary"
              onClick={onClickEdit}
              className="  w-[10vw] text-white items-center"
            >
              {editMode ? (
                "cancel"
              ) : (
                <>
                  <FaPen />
                  edit
                </>
              )}
            </Button>
            {editMode ? (
              <Button
                onClick={onApply}
                className="  w-[10vw] bg-success  text-white items-center"
              >
                Apply Changes
              </Button>
            ) : (
              ""
            )}
            {checked.length > 0 ? (
              <Button
                onClick={() => setOpenDelete(true)}
                className=" transition-all  w-[10vw] text-danger items-center bg-danger bg-opacity-5 hover:text-white hover:bg-opacity-100"
              >
                Delete
              </Button>
            ) : (
              ""
            )}
          </div>
          {/* THIS IS THE DISPLAY NONE INPUT THAT IS BEING CLICKED WITHT THE BUTTON FOR ADDING FILES */}
          <input
            type="file"
            accept="image/*, video/*"
            multiple
            className=" hidden "
            ref={newFilesRef}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFilesChange(e)
            }
          />
          {openDelete ? (
            <div className=" fixed z-50 inset-0 overflow-y-auto  backdrop-contrast-50 ">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 sm:p-0">
                <div className="relative w-full max-w-sm bg-white rounded-lg shadow-md px-8 py-5 modal-content  ">
                  <p className=" font-main mb-3">
                    Are you sure you want to delete these?
                  </p>
                  <div className="flex gap-4 ">
                    {" "}
                    <Button
                      onClick={() => {
                        setOpenDelete(false);
                        setChecked([]);
                      }}
                      variant="primary"
                      className="transition-all bg-opacity-5 hover:text-white hover:bg-opacity-100"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={deleteAssets}
                      className=" transition-all   bg-danger bg-opacity-5 text-danger hover:bg-danger hover:bg-opacity-100 hover:text-white"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </DashWrapper>
  );
};

export default ManageApartment;
