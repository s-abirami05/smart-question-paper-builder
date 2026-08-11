import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export const generatePDF = (
  title,
  subject,
  semester,
  questions
) => {

  const doc = new jsPDF();


  doc.setFontSize(16);

  doc.text(
    title || "Question Paper",
    14,
    20
  );


  doc.setFontSize(12);

  doc.text(
    `Subject: ${subject || "-"}`,
    14,
    30
  );


  doc.text(
    `Semester: ${semester || "-"}`,
    14,
    38
  );


  const data = questions.map((q,index)=>[

    index + 1,
    q.questionText,
    q.marks,
    q.co || "-",
    q.bloomLevel || "-",
    q.pi || "-"

  ]);


  autoTable(doc, {

    startY:45,

    head:[[
      "No",
      "Question",
      "Marks",
      "CO",
      "Bloom",
      "PI"
    ]],

    body:data

  });


  doc.save("Question_Paper.pdf");

};