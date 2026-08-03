import React, { useState } from "react";
import { uploadOCR } from "../services/questionAPI";


function OCRUpload({setQuestions}) {


const [file,setFile]=useState(null);



const handleUpload=async()=>{


if(!file){

alert("Please select a file");
return;

}



const formData=new FormData();

formData.append("file",file);



try{


const response=await uploadOCR(formData);


let text=response.data.text;



// OCR cleanup

text = text.replace(
/State the benefits and drawbacks.*?develoent/gi,
"State the benefits and drawbacks of the spiral life cycle model for software development"
);


text = text.replace(
/List the key characteristics.*?process/gi,
"List the key characteristics of a software process"
);


text = text.replace(
/Write distinct steps.*?requirement/gi,
"Write distinct steps in the requirement engineering process"
);


text = text.replace(
/List out the steps.*?requirements/gi,
"List out the steps of requirements engineering"
);


text = text.replace(
/What are the various models produced by.*?design process/gi,
"What are the various models produced by the software design process"
);


// small word corrections

text = text.replace(/sral/gi,"spiral");

text = text.replace(/develoent/gi,"development");

text = text.replace(
/characteristics a process/gi,
"characteristics of a software process"
);

// OCR corrections

const corrections = {

"sral":"spiral",

"develoentt":"development",

"drawbacks the":"drawbacks of the",

"characteristics a process":
"characteristics of a software process",

"key characteristics a":
"key characteristics of a",

"purpose Petri Nets":
"purpose of Petri Nets",

"steps requirements":
"steps of requirements engineering",

"Write distinct steps in the requirement":
"Write distinct steps in the requirement engineering process",

"List out the steps of requirements":
"List out the steps of requirements engineering",

"VI ( )":
"",

"PART A ( )":
"",

"sral":"spiral",

"develoent":"development",

"drawbacks the sral , life cycle model for develoent":
"drawbacks of the spiral life cycle model for software development",

"characteristics a process":
"characteristics of a software process",

"Write distinct steps in the requirement":
"Write distinct steps in the requirement engineering process",

"steps requirements":
"steps of requirements engineering",

"models produced by the":
"models produced by the software",

"design process":
"software design process",

"sral":
"spiral",

"develoent":
"development",

"drawbacks the":
"drawbacks of the",

"benefits and drawbacks the":
"benefits and drawbacks of the",

"life cycle model for develoent":
"life cycle model for software development",

"characteristics a process":
"characteristics of a software process",

"List the key characteristics a":
"List the key characteristics of a",

"Write distinct steps in the requirement":
"Write distinct steps in the requirement engineering process",

"requirement ...,":
"requirement engineering process",

"steps requirements":
"steps of requirements engineering",

"List out the steps requirements":
"List out the steps of requirements engineering",

"models produced by the .., design process":
"models produced by the software design process",

".., design process":
"software design process"

};



Object.keys(corrections).forEach((key)=>{

text=text.replace(

new RegExp(key,"gi"),

corrections[key]

);

});

// OCR correction

text=text

.replace(/sral/gi,"spiral")

.replace(/develoentt/gi,"development")

.replace(/drawbacks the/gi,"drawbacks of the")

.replace(/characteristics a process/gi,"characteristics of a software process")

.replace(/purpose Petri Nets/gi,"purpose of Petri Nets")

.replace(/steps requirements/gi,"steps of requirements")

.replace(/\. mpare/gi,". Compare")

.replace(/\. ne mpare/gi,". Compare");


// OCR word correction



Object.keys(corrections).forEach(word=>{


    
text=text.replace(

new RegExp(word,"gi"),

corrections[word]

);





});

text=text
.replace(/\n+/g," ")
.replace(/[ \t]+/g," ");





// OCR word correction

text=text

.replace(/\bmpare\b/gi,"Compare")

.replace(/\bsral\b/gi,"spiral")

.replace(/\bDraw a use I i i case\b/gi,"Draw a use case")

.replace(/\bWrite dist i i I hd\b/gi,"Write distinct steps")

.replace(/\bCao LI\b/gi,"")

.replace(/\bwa, ce L RRs\b/gi,"")

.replace(/\bFETE\b/gi,"")

.replace(/\bFETE ae\b/gi,"");







// remove headers

const headers=[

"A.V.C",
"MANNAMPANDAL",
"COLLEGE",
"ENGINEERING",
"CIA TEST",
"FEBRUARY",
"2026",
"VI SEMESTER",
"CCS",
"OBJECT ORIENTED SOFTWARE ENGINEERING",
"REGULATION",
"THREE HOURS",
"MAX MARKS",
"DATE",
"TIME",
"ANSWER ALL",
"PART A",
"PART B",
"QNO",
"BLES",
"CO",
"BLOOM",
"LEVEL",
"PI",
"OBJECT ORIENTED SOFTWARE",
"SOFTWARE",
"Questions",
"Marks",
"Duration",
"Max",
"B.TECH",
"INFORMATION TECHNOLOGY",
"VI SEMESTER",
"OBJECT ORIENTED SOFTWARE",
"ENGINEERING",
"PART A",
"PART B",
"Duration",
"Max",
"Marks",
"pm",
"Questions",

"VI SEMESTER",
"SEMESTER",
"B.TECH",
"INFORMATION TECHNOLOGY",
"OBJECT ORIENTED SOFTWARE ENGINEERING",
"COLLEGE",
"ENGINEERING",
"CIA TEST",
"FEBRUARY",
"2026",
"REGULATION",
"DURATION",
"THREE HOURS",
"MAX MARKS",
"DATE",
"TIME",
"PART A",
"PART B",
"QNO",
"QUESTIONS",
"CO",
"BLOOM",
"LEVEL",
"PI",
"MARKS"


];

const removeWords=[

"VI",
"SEMESTER",
"PART",
"A",
"B",
"Questions",
"QNo",
"Marks",
"CO",
"BLOOM",
"LEVEL",
"PI",
"we"

];







headers.forEach(word=>{


text=text.replace(

new RegExp(word,"gi"),

""

);


});









// split only real questions

// detect question starting words even OCR damaged

text=text

.replace(/\.\s*mpare/gi,". Compare")

.replace(/\.\s*Draw/gi,". Draw")

.replace(/\.\s*What/gi,". What")

.replace(/\.\s*List/gi,". List")

.replace(/\.\s*Write/gi,". Write")

.replace(/\.\s*State/gi,". State")

.replace(/\.\s*Define/gi,". Define");


let questions=text.split(

/(?=\b(State|Define|List|Compare|Write|What|Draw|Differentiate|Explain|Mention)\b)/gi

);



let final=[];



questions.forEach(q=>{


q=q.trim();


q=q.replace(
/\.\s*\./g,
"."
);

q=q.replace(
/,\s*\./g,
"."
);

q=q.replace(
/\s+/g,
" "
);


// remove garbage

q=q.replace(

/\b(loDO|eh|MO|ry|RA|DE|GE|ciuy|ieee|coil|LZ|LL|CTT|Gor|Sis|Clas|SA|OR|Fy|Bel|ori|PA|BREET|fs|hE|ces|Rt|Ye|inc|po)\b/gi,

""

);





q=q.replace(

/[^a-zA-Z\s\.\,\?\(\)]/g,

""

);





q=q.replace(

/\s+/g,

" "

);


q=q.replace(
/\b(l ce|loDO|T|OF|ae|g|x)\b/gi,
""
);

q=q.replace(
/\b(l ce|loDO|T|OF|ae|g|x|il|C|I|i)\b/gi,
""
);

q=q.replace(
/\b(ce|L|RRs|wa|oo|o|i|ii)\b/gi,
""
);





// accept only question text

if(q.length > 20){

if(q.includes("PART B")){
 q = q.split("PART B")[0];
}


// remove empty questions
if(q.trim().length > 20){

    // final question cleanup

q = q
.replace(/\s+/g," ")
.trim();


// join broken questions

q = q.replace(
/Differentiate data flow diagram and$/i,
"Differentiate data flow diagram and state transition diagram"
);


// missing words correction

q = q.replace(
/State the benefits and drawbacks the sral , life cycle model for develoent/gi,
"State the benefits and drawbacks of the spiral life cycle model for software development"
);


q = q.replace(
/List the key characteristics a process/gi,
"List the key characteristics of a software process"
);


q = q.replace(
/What is the purpose Petri Nets/gi,
"What is the purpose of Petri Nets"
);


q = q.replace(
/Write distinct steps in the requirement/gi,
"Write distinct steps in the requirement engineering process"
);


q = q.replace(
/List out the steps requirements/gi,
"List out the steps of requirements engineering"
);


q = q.replace(
/What are the various models produced by the .., design process/gi,
"What are the various models produced by the software design process"
);


// remove unwanted first OCR header

if(
q.includes("PART A") ||
q.includes("VI") ||
q.length < 15
){
return;
}

if(q.length > 20){


    // final cleanup


q = q
.replace(/\s*\.\s*\./g,".")
.replace(/\s*,\s*\./g,".")
.replace(/\s+\./g,".")
.trim();

q = q
.replace(/\.+/g, ".")
.replace(/\s+,/g, "")
.trim();

q = q
.replace(/\?\./g, "?")
.replace(/\.\./g, ".")
.trim();

// remove broken duplicate questions

if(
q.toLowerCase()
==="state transition diagram."
||
q.toLowerCase()
==="state transition diagram"
){
return;
}


// remove duplicate questions

let duplicate = final.some(item =>

item.questionText
.toLowerCase()
.replace(/[.,]/g,"")
.trim()
===
q.toLowerCase()
.replace(/[.,]/g,"")
.trim()

);


if(duplicate){
return;
}

if(
q.includes("Differentiate data flow diagram and state transition diagram")
){

q =
"Differentiate data flow diagram and state transition diagram.";

}

if(
q.toLowerCase().includes("differentiate data flow diagram and state transition diagram")
){

q = "Differentiate data flow diagram and state transition diagram.";

}

final.push({

questionNumber: final.length+1,

questionText:q,

marks:0,

co:"-",

bloomLevel:"-",

pi:"-"

});

}

// remove duplicate questions

let exists = final.some(
(item)=>
item.questionText.toLowerCase()
.replace(/\s+/g," ")
.trim()
===
q.toLowerCase()
.replace(/\s+/g," ")
.trim()
);


if(exists){
 return;
}



// merge broken state transition question

if(
q.toLowerCase()
.includes("state transition diagram")
){

q="Differentiate data flow diagram and state transition diagram";

}

final.push({

questionNumber: final.length + 1,

questionText: q.trim(),

marks: 0,

co: "-",

bloomLevel: "-",

pi: "-"

});

}

}

},






console.log("FINAL OCR:", final));

setQuestions(final);


alert("OCR Upload Successful");


}

catch(error){

console.log(error);

alert("OCR Upload Failed");

}


};







return(

<div className="mt-6">

<h2 className="text-xl font-semibold mb-3">
OCR Upload
</h2>


<input

type="file"

accept=".pdf,image/*"

onChange={(e)=>setFile(e.target.files[0])}

/>


<button

onClick={handleUpload}

className="bg-purple-600 text-white px-4 py-2 rounded ml-3"

>

Upload

</button>


</div>

);



}


export default OCRUpload;