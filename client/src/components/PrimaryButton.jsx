const PrimaryButton=({text,onClick,type="button"})=>{

return(

<button

type={type}

onClick={onClick}

className="w-full py-4 rounded-2xl bg-linear-to-r from-violet-600 to-purple-500 text-white font-semibold text-lg shadow-lg hover:scale-[1.02] transition"

>

{text}

</button>

);

};

export default PrimaryButton;