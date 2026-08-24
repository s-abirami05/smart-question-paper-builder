exports.getDashboard = async (req, res) => {

    try {

        res.status(200).json({

            subjects: 6,

            papers: 20,

            accuracy: 95,

            users: 15

        });

    }

    catch(error){

        res.status(500).json({

            message:"Server Error"

        });

    }

}