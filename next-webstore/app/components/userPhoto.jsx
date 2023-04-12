import React, { useState } from "react";

const userPhoto = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  function handleFileUpload(event) {
    setSelectedFile(event.target.files[0]);
  }

  return (
    <>
      <img src="./niccage.png" alt="User profile picture" />
      <label htmlFor="file-upload">Change your profile photo?</label>
      <input id="file-upload" type="file" accept=".jpg,.png,.gif" onChange={handleFileUpload} />
    </>
  );
};

export default userPhoto;
