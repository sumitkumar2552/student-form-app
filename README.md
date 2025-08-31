# Student Enrollment Form with JsonPowerDB

## Description
This project implements a **Student Enrollment Form** using **JsonPowerDB**. The form allows users to **create, retrieve, update, and reset student records** in the `STUDENT_TABLE` of the `SCHOOL_DB` database.  

The primary key for the records is **Roll No**, ensuring no duplicate entries are allowed. The form dynamically enables or disables buttons based on whether the record exists in the database.  

---

## Benefits of using JsonPowerDB
- **No SQL required**: Simple JSON-based API for database operations.  
- **Lightweight and fast**: Ideal for small-scale applications and educational projects.  
- **Flexible**: Easily extendable to other forms or databases.  
- **Real-time validation**: Automatically checks for duplicate primary keys and enables/disables buttons accordingly.  

---

## Table of Contents
- [Project Description](#description)  
- [Benefits](#benefits-of-using-jsonpowerdb)  
- [Features](#scope-of-functionalities)  
- [Release History](#release-history)  
- [Examples of Use](#examples-of-use)  
- [Project Status](#project-status)  
- [Sources](#sources)  

---

## Scope of Functionalities
1. **Primary Key Validation**:  
   - Users enter Roll No first.  
   - If the Roll No exists → form auto-populates, enables `Update` & `Reset`, disables `Save`.  
   - If Roll No does not exist → enables `Save` & `Reset` buttons for new entry.  

2. **Form Controls**:
   - `Save` → Saves a new student record.  
   - `Update` → Updates an existing record.  
   - `Reset` → Clears the form and resets the input focus.  

3. **Form Fields**:
   - Roll No (Primary Key)  
   - Full Name  
   - Class  
   - Birth Date  
   - Address  
   - Enrollment Date  

4. **Validation**:  
   - Ensures no field is left empty before saving/updating.  
   - Prevents saving duplicate Roll Numbers.  

---

## Release History
- **v1.0** – Initial release with full CRUD functionality using JsonPowerDB.

---

## Examples of Use
1. **Adding a new student**:
   - Enter a new Roll No.  
   - Fill all fields.  
   - Click `Save`.  
   - Record is added to the database.  

2. **Updating an existing student**:
   - Enter an existing Roll No.  
   - Form auto-populates the data.  
   - Modify required fields.  
   - Click `Update`.  
   - Database is updated.  

3. **Resetting the form**:
   - Click `Reset` to clear all fields and start a new entry.  

---

## Project Status
- ✅ Functional: Create, Update, and Reset working correctly.  
- ⚠️ In Progress: Optional features like illustrations and export to CSV.  

---

## Sources
- [JsonPowerDB Official Documentation](https://www.login2explore.com/jsonpowerdb-documentation/)  
- [Bootstrap 3 Documentation](https://getbootstrap.com/docs/3.4/)  
- [jQuery Documentation](https://api.jquery.com/)  

---

## Other Information
- This project is designed as a **micro-project for educational purposes**.  
- It can be extended to handle multiple tables or more complex validation.  
- Ensure **active internet connection** while using JsonPowerDB API.  
