import React from "react";
import { useForm } from "react-hook-form";

function FileUpload() {
  const { register } = useForm()
 return (
    <form >
      
      <label>Please Upload Driver's License</label><br />
      <input type="file" {...register('file', { required: true })} />

    </form>
  );
}

export default FileUpload;