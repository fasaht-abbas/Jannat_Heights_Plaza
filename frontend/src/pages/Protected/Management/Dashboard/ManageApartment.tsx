import React, { useEffect, useRef, useState } from "react";
import DashWrapper from "./DashWrapper";
import Button from "../../../../components/reuseables/Button";
import { FaPen } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { handleError, protectedApi } from "../../../../utils/axios";
import toast from "react-hot-toast";
import { ApartDTO, AssetDTO } from "../../../../components/interface";
import { HiDotsVertical } from "react-icons/hi";
import Loading from "../../../../components/reuseables/Loading";
import { IoTabletLandscapeOutline } from "react-icons/io5";
import {
  HeadingText,
  SubHeadingText,
} from "../../../../components/reuseables/CustomTypographies";
import InputField from "../../../../components/reuseables/InputField";
import RevealBottom from "../../../../components/Animations/RevealBottom";

const ManageApartment = () => {
  const [editAssetMode, setEditAssetMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [existing, setExisting] = useState<AssetDTO[]>([]);
  const [ehompage, setEhomepage] = useState<AssetDTO[]>([]);
  const [viewDotMenu, setViewDotMenu] = useState("");
  const [openAddApart, setOpenAddApart] = useState(false);
  const [checked, setChecked] = useState<string[]>([]);
  const [openDelete, setOpenDelete] = useState(false);
  const newFilesRef = useRef<HTMLInputElement>(null);

  //  for the new appartment form
  const [apartNumber, setApartNumber] = useState("");
  const [apartRent, setApartRent] = useState("");
  const [apartFloor, setApartFloor] = useState("");
  const [editApartment, setEditApartment] = useState(false);
  const [selectedToEdit, setSelectedToEdit] = useState<ApartDTO | null>();

  // for the exsisting apartmetns
  const [allAparts, setAllAparts] = useState<ApartDTO[]>([]);

  // i have jsut manually set the width height of these images infact i need to creat a canvas for its croping down
  const AssetViewClasses =
    " relative h-[22.5vw] w-[40vw] md:h-[9.5vw] md:w-[17vw] overflow-hidden";

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (selected) {
      const selectedArray = Array.from(selected);
      setSelectedFiles([...selectedFiles, ...selectedArray]);
    }
  };

  const onClickEdit = () => {
    if (editAssetMode) {
      setEditAssetMode(false);
      setSelectedFiles([]);
      setChecked([]);
      setViewDotMenu("");
    } else {
      setEditAssetMode(true);
    }
  };
  // for fetching the existing assets
  const fetchAssets = async () => {
    setLoading(true);
    try {
      const { data } = await protectedApi.get(
        "/api/v1/apart/get-all-apart-assets"
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
  const UploadApartAssets = async () => {
    setLoading(true);

    try {
      const formdata = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formdata.append("files", selectedFiles[i]);
      }
      const { data } = await protectedApi.post(
        "/api/v1/apart/upload-apartment-assets",
        formdata
      );
      if (data?.success) {
        setLoading(false);
        setSelectedFiles([]);

        toast.success("Uploaded Successfully");
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
      const { data } = await protectedApi.post(
        "/api/v1/apart/delete-asset",
        checked
      );
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
  // removing picture or video from the homepage
  const removeFromHomepage = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await protectedApi.put(
        "/api/v1/apart/remove-from-hompage",
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
  // set asset on the homepage
  const setOnHomepageAsset = async (id: string) => {
    try {
      setLoading(true);
      const { data } = await protectedApi.put("/api/v1/apart/set-on-homepage", {
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
  //adding an apartment
  const addApartment = async () => {
    try {
      setLoading(true);
      const { data } = await protectedApi.post("/api/v1/apart/create-apart", {
        no: apartNumber,
        floor: apartFloor,
        rent: apartRent,
      });
      if (data?.success) {
        setLoading(false);
        setApartFloor("");
        setApartNumber("");
        setApartRent("");
        fetchAparts();
        toast.success("new apartment Added");
        // fetching all the aprtments
      }
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  };
  // updaing the apartment
  const updateApartment = async () => {
    try {
      const { data } = await protectedApi.put(
        `/api/v1/apart/update-apart/${selectedToEdit?._id}`,
        {
          no: selectedToEdit?.no,
          rent: selectedToEdit?.rent,
          floor: selectedToEdit?.floor,
          status: selectedToEdit?.status,
        }
      );
      if (data?.success) {
        toast.success("Updated Successfully");
        setSelectedToEdit(null);
        setEditApartment(false);
        fetchAparts();
      }
    } catch (error) {
      handleError(error);
    }
  };
  // deleing the apartment
  const DeleteApartment = async () => {
    try {
      const { data } = await protectedApi.delete(
        `/api/v1/apart/delete-apart/${selectedToEdit?._id}`
      );
      if (data?.success) {
        toast.success("Deleted Successfully");
        setSelectedToEdit(null);
        setEditApartment(false);
        fetchAparts();
      }
    } catch (error) {
      handleError(error);
    }
  };
  // fetching the apartment
  const fetchAparts = async () => {
    try {
      const { data } = await protectedApi.get("/api/v1/apart/get-all-aparts");
      if (data?.success) {
        setAllAparts(data?.allAparts);
      }
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    fetchAssets();
    fetchAparts();
  }, []);
  return (
    <DashWrapper>
      {" "}
      <div className="  p-[2vh] flex gap-4 w-full text-center items-center justify-center ">
        <HeadingText text="Manage Apartments" />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-3 relative px-[3vw] ">
          <SubHeadingText
            text="Existing Photos"
            className=" text-accent text-center w-full"
          />
          {/* Mapping of the Homepage Assets/contnet */}
          <SubHeadingText text="Set on HomePage" className=" text-accent" />
          <div className="  flex flex-wrap gap-3 items-center  justify-center md:justify-start">
            {ehompage?.length ? (
              ehompage.map((file) => {
                const isVideo = file?.type === "video";

                return (
                  <div className={`${AssetViewClasses} `}>
                    {isVideo ? (
                      <video
                        className=" size-full rounded-sm object-cover"
                        controls
                      >
                        <source src={file.link} />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        className="   size-full rounded-sm object-cover"
                        src={file.link}
                      />
                    )}
                    {editAssetMode ? (
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
                          {viewDotMenu === file._id ? (
                            <p
                              onClick={() => removeFromHomepage(file._id)}
                              className="  duration-500  border-secondary border-opacity-25 text-xs  border-2 transition-all sm:w-[30vw] px-0  md:w-[12vw]   bg-white  text-secondary absolute right-[0] top:1 md:top-4 p-0"
                            >
                              Hide from homepage
                            </p>
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
            ) : editAssetMode ? (
              <p className=" font-main text-2xl">Add relevent Photos/videos</p>
            ) : (
              <p className=" font-main text-2xl">No photos/videos Added</p>
            )}
          </div>
          {/* Mapping of the content except for the homepage content */}
          <SubHeadingText text="Not set on Homepage" className=" text-accent" />
          <div className=" flex flex-wrap gap-3 justify-center md:justify-start">
            {existing?.length ? (
              existing.map((file) => {
                const isVideo = file?.type === "video";

                return (
                  <div className={`${AssetViewClasses} `}>
                    {isVideo ? (
                      <video className=" size-full rounded-sm object-cover">
                        <source src={file.link} />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        className="   size-full rounded-sm object-cover"
                        src={file.link}
                      />
                    )}
                    {editAssetMode ? (
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
                          {viewDotMenu === file._id ? (
                            <p
                              onClick={() => setOnHomepageAsset(file._id)}
                              className=" duration-500  border-secondary border-opacity-25 text-xs  border-2 transition-all  sm:w-[30vw] px-0  md:w-[12vw]  bg-white  text-secondary absolute right-[0] top:1 md:top-4 p-0"
                            >
                              set on Homepage
                            </p>
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
            ) : editAssetMode ? (
              <p className=" font-main text-2xl">Add relevent Photos/videos</p>
            ) : (
              <p className=" font-main text-2xl">No photos/videos Added</p>
            )}
          </div>
          {/* mapping the photos selected to be uploaded */}
          <div className="flex flex-wrap gap-3">
            {selectedFiles.length > 0 ? (
              <SubHeadingText
                text="Previewing new"
                className="w-full text-center text-accent"
              />
            ) : (
              ""
            )}
            {/* prewiwing the files */}
            {selectedFiles.map((file) => {
              const isVideo = file.type.startsWith("video/");

              return (
                <div className={`${AssetViewClasses} `}>
                  {isVideo ? (
                    <video
                      className=" size-full rounded-sm object-cover"
                      controls
                    >
                      <source
                        src={URL.createObjectURL(file)}
                        type={file.type}
                      />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      className="   size-full rounded-sm object-cover"
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
          </div>
          {/* The Buttons if the edit mode is turned on */}
          {editAssetMode && (
            <>
              <RevealBottom>
                <div className="flex gap-2 items-start">
                  <SubHeadingText
                    className="text-accent"
                    text="Please add only landscape photos  with 16/9 aspect ratio"
                  />
                  <IoTabletLandscapeOutline className="size-7 text-accent" />
                </div>

                <Button
                  variant="primary"
                  className={`w-full  flex justify-center  hover:text-white text-white items-center`}
                  onClick={() => {
                    newFilesRef.current?.click();
                  }}
                >
                  <CiCirclePlus size={30} />
                  <p className=" font-accent text-sm">add photo/video</p>
                </Button>
              </RevealBottom>
            </>
          )}
          <div className=" mt-4 flex gap-3 justify-end pr-[3vh] mb-[3vh]">
            <Button
              variant="primary"
              onClick={onClickEdit}
              className=" sm:w-[20vw] md:w-[10vw] text-primary bg-opacity-5 hover:bg-opacity-15 flex gap-4 items-center justify-center"
            >
              {editAssetMode ? (
                "cancel"
              ) : (
                <>
                  <FaPen />
                  edit
                </>
              )}
            </Button>
            {editAssetMode && (
              <div className="flex gap-2">
                {selectedFiles?.length > 0 && (
                  <Button
                    variant="primary"
                    className="text-white sm:w-[20vw] md:w-[10vw]"
                    onClick={UploadApartAssets}
                  >
                    Upload
                  </Button>
                )}
                <Button
                  onClick={() => {
                    setSelectedFiles([]);
                    setChecked([]);
                    setEditAssetMode(false);
                    toast.success("Changes applied");
                  }}
                  variant="success"
                  className=" bg-success sm:w-[20vw] md:w-[10vw] text-white items-center"
                >
                  Apply
                </Button>
              </div>
            )}
            {checked.length > 0 && (
              <Button
                onClick={() => setOpenDelete(true)}
                className=" transition-all  w-[10vw] text-danger items-center bg-danger bg-opacity-5 hover:text-white hover:bg-opacity-100"
              >
                Delete
              </Button>
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
          {
            // this is the model for the delting the selected files
            openDelete && (
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
            )
          }
          <hr />
          {/* // Now for Editing Apartments and new Apartments */}
          <div className="flex flex-col w-full gap-4 mb-[2vh]">
            <SubHeadingText
              text="Add/edit Apartments"
              className="w-full text-center"
            />

            <table className="border-accent border-2  font-main text-xs md:text-lg ">
              <thead>
                <tr className="  text-center ">
                  <th className="py-4">Sr #</th>
                  <th>Apart #</th>
                  <th>Floor</th>
                  <th>Rent(PKR)</th>
                  <th>Status</th>
                  <th>{openAddApart ? "Edit" : "Details"}</th>
                </tr>
              </thead>
              <tbody>
                {allAparts.length > 0 &&
                  allAparts.map((apart, i) => {
                    return (
                      <tr className=" text-center">
                        <td className="font-bold py-3">{i + 1}</td>
                        <td>{apart.no}</td>
                        <td>{apart.floor}</td>
                        <td>{apart.rent}</td>
                        <td
                          className={` font-bold ${
                            apart.status === "Available"
                              ? "text-success"
                              : "text-danger"
                          }`}
                        >
                          {apart.status}
                        </td>
                        <td className="flex justify-center">
                          {openAddApart ? (
                            <Button
                              variant="primary"
                              onClick={() => {
                                setSelectedToEdit(apart);
                                setEditApartment(true);
                              }}
                              className=" text-white"
                            >
                              <FaPen />
                            </Button>
                          ) : (
                            <Button variant="accent" className=" text-white">
                              View
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {/* model for the edit apartment window */}
            {editApartment && (
              <div className=" fixed z-50 inset-0 overflow-y-auto  backdrop-contrast-50 ">
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 sm:p-0">
                  <div className="relative w-fit  max-w-5xl  bg-white rounded-lg shadow-md px-8 py-5 modal-content flex flex-col gap-4 ">
                    <div className="flex flex-col md:flex-row gap-4 w-full items-center mx-auto justify-evenly">
                      <InputField
                        value={selectedToEdit?.no}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setSelectedToEdit((prev) =>
                            prev ? { ...prev, no: e.target.value } : null
                          );
                        }}
                        label="Apartment #"
                        className=" flex-grow "
                      />
                      <InputField
                        type="number"
                        value={selectedToEdit?.rent?.toString()} // Convert number to string for the input field
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const value = parseFloat(e.target.value); // Convert string input to number
                          setSelectedToEdit((prev) =>
                            prev
                              ? { ...prev, rent: isNaN(value) ? 0 : value }
                              : null
                          );
                        }}
                        label="Rent (PKR)"
                        className="flex-grow"
                        labelClass="col-span-2"
                      />
                      <div
                        className="flex items-center justify-center flex-grow gap-4 mt-4
                 "
                      >
                        <p className=" font-bold text-secondary  text-lg">
                          Select Floor
                        </p>
                        <select
                          value={selectedToEdit?.floor}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setSelectedToEdit((prev) =>
                              prev ? { ...prev, floor: e.target.value } : null
                            )
                          }
                          className="w-20 bg-opacity-0 bg-accent border-accent border-2 rounded-md"
                        >
                          <option value="">select</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                        </select>
                      </div>
                      <div
                        className="flex items-center justify-center flex-grow gap-4 mt-4
                 "
                      >
                        <p className=" font-bold text-secondary  text-lg">
                          Select status
                        </p>
                        <select
                          value={selectedToEdit?.status}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setSelectedToEdit((prev) =>
                              prev ? { ...prev, status: e.target.value } : null
                            )
                          }
                          className="w-fit bg-opacity-0 bg-accent border-accent border-2 rounded-md"
                        >
                          <option value="">select</option>
                          <option value="Available">Available</option>
                          <option value="Booked">Booked</option>
                        </select>
                      </div>
                    </div>

                    <div
                      className="flex gap-4 justify-end
                     "
                    >
                      {" "}
                      <Button
                        onClick={() => {
                          setSelectedToEdit(null);
                          setEditApartment(false);
                        }}
                        variant="primary"
                        className="transition-all bg-opacity-5 hover:text-white hover:bg-opacity-100"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="success"
                        onClick={updateApartment}
                        className=" transition-all   hover:text-white"
                      >
                        Update
                      </Button>
                      <Button
                        variant="danger"
                        onClick={DeleteApartment}
                        className=" transition-all   hover:text-white"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className=" flex flex-col gap-4 w-full ">
              <div className="w-full flex gap-4 items-center justify-end font-main">
                {!openAddApart && (
                  <>
                    <Button
                      onClick={() => {
                        setOpenAddApart((prev) => !prev);
                      }}
                      variant="primary"
                      className=" text-primary bg-opacity-5 hover:bg-opacity-15 flex gap-4 items-center justify-center"
                    >
                      Add New or Edit Apartments
                    </Button>
                  </>
                )}
              </div>
              {openAddApart && (
                <RevealBottom>
                  <div className="flex w-full flex-wrap border-accent border-2 rounded-md p-4 gap-4">
                    <SubHeadingText
                      text="Fill this form and Click Add to create new apartment"
                      className="text-center w-full"
                    />

                    <div className="flex flex-col md:flex-row gap-4 w-full items-center mx-auto justify-evenly">
                      <InputField
                        value={apartNumber}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setApartNumber(e.target.value);
                        }}
                        label="Apartment #"
                        className=" flex-grow "
                      />
                      <InputField
                        value={apartRent}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setApartRent(e.target.value);
                        }}
                        label="Rent (PKR)"
                        className="  flex-grow"
                        labelClass="col-span-2"
                      />
                      <div
                        className="flex items-center justify-center flex-grow gap-4 mt-4
                 "
                      >
                        <p className=" font-bold text-secondary  text-lg">
                          Select Floor
                        </p>
                        <select
                          value={apartFloor}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setApartFloor(e.target.value)
                          }
                          className=" accent-primary w-20 bg-opacity-0 bg-accent border-accent border-2 rounded-md"
                        >
                          <option value="">select</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                        </select>
                      </div>
                    </div>

                    <div className=" flex w-full justify-end gap-4">
                      <Button
                        variant="primary"
                        onClick={() => {
                          setOpenAddApart(false);
                        }}
                        className=" text-white"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={addApartment}
                        variant="success"
                        className="bg-success w-20 text-white"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </RevealBottom>
              )}
            </div>
          </div>
        </div>
      )}
    </DashWrapper>
  );
};

export default ManageApartment;
