import React from "react";

const Message = ({ text }) => {
  return (
    <div>
      <h5 className="p-5 text-2xl bg-amber-200 text-indigo-700 font-medium rounded-2xl absolute top-0 left-0 m-5">
        {text}
      </h5>
    </div>
  );
}

export default Message;
