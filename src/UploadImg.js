import React, { useState } from "react";
import ipfsClient from 'ipfs-api';

function UploadImg() {
  const [file, setFile] = useState(null);
  const [hash, setHash] = useState("");

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const ipfsResponse = await ipfsClient.add(formData);
      setHash(ipfsResponse.path);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
      {file && (
        <div>
          <h4>{file.name}</h4>
          <p>{file.size} bytes</p>
          <p>{console.log(file)}</p>
        </div>
      )}
      {hash && (
        <div>
          <h4>IPFS Hash:</h4>
          <p>{hash}</p>
          <img src={`https://gateway.ipfs.io/ipfs/${hash}`} alt="IPFS Preview" />
        </div>
      )}
    </div>
  );
}

export default UploadImg;
