import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const downloadPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text("Smart Question Paper Builder",20,20);

    autoTable(doc,{
        startY:35,

        head:[["Title","Value"]],

        body:[
            ["Subjects",6],
            ["Generated Papers",20],
            ["Prediction Accuracy","95%"],
            ["Users",15]
        ]
    });

    doc.save("Dashboard_Report.pdf");

}