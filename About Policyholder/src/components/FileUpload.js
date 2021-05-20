import React from "react";
import { useForm } from "react-hook-form";

function FileUpload() {
  const { register } = useForm()
 return (
    <form >
      <h3>Driver Details</h3>
      <label>Please Upload Driver's License</label><br />
      <input type="file" {...register('file', { required: true })} />

    </form>
  );
}

export default FileUpload;