import React, { useState } from 'react';

const SelectDetails = () => {
  const [formData, setFormData] = useState({
    department: '',
    semester: '',
    subjectName: '',
    subjectCode: '',
  });

  // Dynamic Subject Code mapping based on selection
  const subjectsMap = {
    'MA101': 'Engineering Mathematics I',
    'CS101': 'Programming in C',
    'IT101': 'Basics of Information Technology'
  };

  const handleDepartmentChange = (e) => {
    setFormData({ ...formData, department: e.target.value });
  };

  const handleSemesterChange = (e) => {
    setFormData({ ...formData, semester: e.target.value });
  };

  const handleSubjectChange = (e) => {
    const selectedCode = e.target.value;
    setFormData({
      ...formData,
      subjectCode: selectedCode,
      subjectName: subjectsMap[selectedCode] || '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Generating paper with:', formData);
    alert('Question Paper Generation Started!');
  };

  const isFormComplete =
    formData.department &&
    formData.semester &&
    formData.subjectName &&
    formData.subjectCode;

  return (
    <div style={styles.pageBackground}>
      <div style={styles.cardContainer}>
        {/* Top Header Controls */}
        <div style={styles.topHeader}>
          <button style={styles.backButton} onClick={() => window.history.back()}>
            &lsaquo;
          </button>
        </div>

        {/* Icon & Title */}
        <div style={styles.headerSection}>
          <div style={styles.iconBox}>
            <span style={{ fontSize: '20px' }}>📄</span>
          </div>
          <h2 style={styles.title}>Question Paper</h2>
          <p style={styles.subtitle}>Select the details to generate your paper</p>
        </div>

        {/* Progress Step Indicator */}
        <div style={styles.stepContainer}>
          <div style={{ ...styles.stepBar, backgroundColor: '#7C5CFC' }}></div>
          <div style={{ ...styles.stepBar, backgroundColor: formData.department ? '#7C5CFC' : '#E5E7EB' }}></div>
          <div style={{ ...styles.stepBar, backgroundColor: formData.semester ? '#7C5CFC' : '#E5E7EB' }}></div>
          <div style={{ ...styles.stepBar, backgroundColor: formData.subjectCode ? '#7C5CFC' : '#E5E7EB' }}></div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Department */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>DEPARTMENT</label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>🏠</span>
              <select
                value={formData.department}
                onChange={handleDepartmentChange}
                style={styles.selectInput}
              >
                <option value="">Select department</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
              </select>
            </div>
          </div>

          {/* Semester */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>SEMESTER</label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>📅</span>
              <select
                value={formData.semester}
                onChange={handleSemesterChange}
                style={styles.selectInput}
              >
                <option value="">Select semester</option>
                <option value="Semester 1">Semester 1</option>
                <option value="Semester 2">Semester 2</option>
                <option value="Semester 3">Semester 3</option>
              </select>
            </div>
          </div>

          {/* Subject Name */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>SUBJECT NAME</label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>📕</span>
              <select
                value={formData.subjectCode}
                onChange={handleSubjectChange}
                style={styles.selectInput}
              >
                <option value="">Select subject</option>
                <option value="MA101">Engineering Mathematics I</option>
                <option value="CS101">Programming in C</option>
                <option value="IT101">Basics of Information Technology</option>
              </select>
            </div>
          </div>

          {/* Subject Code */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>SUBJECT CODE</label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>&lt;/&gt;</span>
              <input
                type="text"
                value={formData.subjectCode}
                placeholder="Auto-filled from subject"
                readOnly
                style={{ ...styles.selectInput, cursor: 'not-allowed', backgroundColor: '#F9FAFB' }}
              />
            </div>
          </div>

          {/* Selected Details Preview Box */}
          {isFormComplete && (
            <div style={styles.summaryCard}>
              <div style={styles.summaryTitle}>SELECTED DETAILS</div>
              
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Department</span>
                <span style={styles.summaryValue}>{formData.department}</span>
              </div>
              
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Semester</span>
                <span style={styles.summaryValue}>{formData.semester}</span>
              </div>
              
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Subject</span>
                <span style={styles.summaryValue}>{formData.subjectName}</span>
              </div>
              
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Code</span>
                <span style={styles.summaryValue}>{formData.subjectCode}</span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormComplete}
            style={{
              ...styles.submitBtn,
              backgroundColor: isFormComplete ? '#7C5CFC' : '#C4B5FD',
              cursor: isFormComplete ? 'pointer' : 'not-allowed',
            }}
          >
            ✨ Create Question Paper
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  pageBackground: {
    backgroundColor: '#F3F4F6',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    maxWidth: '420px',
    borderRadius: '24px',
    padding: '28px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
  },
  topHeader: {
    marginBottom: '16px',
  },
  backButton: {
    border: 'none',
    backgroundColor: '#F3F4F6',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#4B5563',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSection: {
    marginBottom: '20px',
  },
  iconBox: {
    backgroundColor: '#8B5CF6',
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFF',
    marginBottom: '12px',
  },
  title: {
    margin: '0 0 6px 0',
    fontSize: '22px',
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    margin: 0,
    fontSize: '14px',
    color: '#6B7280',
  },
  stepContainer: {
    display: 'flex',
    gap: '8px',
    marginBottom: '24px',
  },
  stepBar: {
    height: '4px',
    flex: 1,
    borderRadius: '2px',
    transition: 'background-color 0.3s ease',
  },
  fieldGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    fontSize: '11px',
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: '0.5px',
    marginBottom: '6px',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '14px',
    fontSize: '14px',
    color: '#9CA3AF',
    pointerEvents: 'none',
  },
  selectInput: {
    width: '100%',
    padding: '12px 14px 12px 40px',
    borderRadius: '12px',
    border: '1px solid #E5E7EB',
    backgroundColor: '#F9FAFB',
    fontSize: '14px',
    color: '#1F2937',
    outline: 'none',
    boxSizing: 'border-box',
    appearance: 'none',
  },
  summaryCard: {
    backgroundColor: '#F5F3FF',
    borderRadius: '16px',
    padding: '16px',
    marginTop: '20px',
    marginBottom: '20px',
    border: '1px solid #EDE9FE',
  },
  summaryTitle: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#7C5CFC',
    letterSpacing: '0.5px',
    marginBottom: '12px',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    marginBottom: '8px',
  },
  summaryLabel: {
    color: '#6B7280',
    flex: 1,
  },
  summaryValue: {
    color: '#111827',
    fontWeight: '600',
    textAlign: 'right',
    flex: 2,
  },
  submitBtn: {
    width: '100%',
    padding: '14px',
    border: 'none',
    borderRadius: '12px',
    color: '#FFFFFF',
    fontSize: '15px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    marginTop: '8px',
  },
};

export default SelectDetails;