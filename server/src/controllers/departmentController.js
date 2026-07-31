import Department from "../models/Department.js";

// Create Department
export const createDepartment = async (req, res) => {
  try {
    const { name, code } = req.body;

    if (!name || !code) {
      return res.status(400).json({
        message: "Name and code are required",
      });
    }

    const existingDepartment = await Department.findOne({
      code,
    });

    if (existingDepartment) {
      return res.status(400).json({
        message: "Department already exists",
      });
    }

    const department = await Department.create({
      name,
      code,
    });

    res.status(201).json({
      message: "Department Created Successfully",
      department,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Get All Departments
export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();

    res.status(200).json(departments);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Update Department
export const updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Department Updated",
      department,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Delete Department
export const deleteDepartment = async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Department Deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
