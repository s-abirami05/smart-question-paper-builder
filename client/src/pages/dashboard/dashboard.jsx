import { downloadPDF } from "../../utils/pdfGenerator";
import Charts from "./Charts";
import "./Dashboard.css";
import { sendEmail } from "../../services/emailService";

function Dashboard() {
    const handleEmail = async () => {

    await sendEmail("admin@gmail.com");

    alert("Email Sent Successfully");

};
  return (
    <div className="dashboard">

      <h1 className="title">
        Smart Question Paper Builder
      </h1>

      <div className="card-container">

        <div className="card">
          <h3>Total Subjects</h3>
          <p>12</p>
        </div>

        <div className="card">
          <h3>Generated Papers</h3>
          <p>40</p>
        </div>

        <div className="card">
          <h3>Prediction Accuracy</h3>
          <p>92%</p>
        </div>

        <div className="card">
          <h3>Total Users</h3>
          <p>15</p>
        </div>

      </div>

<button onClick={downloadPDF} >

Download PDF

</button>
<button onClick={handleEmail} >

    Send Email
    
</button>

    </div>
 
  );
}

export default Dashboard;

