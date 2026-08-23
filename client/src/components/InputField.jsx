import React from "react";

const InputField = ({
icon,
type,
placeholder,
value,
onChange
})=>{

return(

<div className="relative w-full">

<div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">

{icon}

</div>

<input

type={type}

placeholder={placeholder}

value={value}

onChange={onChange}

className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-[#F8F8FC] focus:outline-none focus:ring-2 focus:ring-violet-500 transition"

/>

</div>

);

};

export default InputField;