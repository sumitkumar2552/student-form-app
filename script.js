function resetForm() {
    $("#rollNo").val("");
    $("#fullName").val("").prop("disabled", true);
    $("#className").val("").prop("disabled", true);
    $("#birthDate").val("").prop("disabled", true);
    $("#address").val("").prop("disabled", true);
    $("#enrollDate").val("").prop("disabled", true);

    $("#saveBtn").prop("disabled", true);
    $("#updateBtn").prop("disabled", true);

    $("#rollNo").prop("disabled", false).focus();
}

// Validate form data
function validateAndGetFormData() {
    var rollNo = $("#rollNo").val().trim();
    if(rollNo === "") { alert("Roll No Required!"); $("#rollNo").focus(); return ""; }

    var fullName = $("#fullName").val().trim();
    if(fullName === "") { alert("Full Name Required!"); $("#fullName").focus(); return ""; }

    var className = $("#className").val().trim();
    if(className === "") { alert("Class Required!"); $("#className").focus(); return ""; }

    var birthDate = $("#birthDate").val().trim();
    if(birthDate === "") { alert("Birth Date Required!"); $("#birthDate").focus(); return ""; }

    var address = $("#address").val().trim();
    if(address === "") { alert("Address Required!"); $("#address").focus(); return ""; }

    var enrollDate = $("#enrollDate").val().trim();
    if(enrollDate === "") { alert("Enrollment Date Required!"); $("#enrollDate").focus(); return ""; }

    var jsonObj = {
        rollNo: rollNo,
        fullName: fullName,
        className: className,
        birthDate: birthDate,
        address: address,
        enrollDate: enrollDate
    };

    return JSON.stringify(jsonObj);
}

// Create PUT request
function createPUTRequest(token, jsonObj, dbName, relName) {
    return `{
        "token": "${token}",
        "dbName": "${dbName}",
        "cmd": "PUT",
        "rel": "${relName}",
        "jsonStr": ${jsonObj}
    }`;
}




// Create UPDATE request
function createUPDATERequest(token, jsonObj, dbName, relName, recNo) {
    return `{
        "token": "${token}",
        "dbName": "${dbName}",
        "cmd": "UPDATE",
        "rel": "${relName}",
        "jsonStr": { "${recNo}": ${jsonObj} }
    }`;
}




// Create GET request
function createGETRequest(token, dbName, relName, jsonObj) {
    return `{
        "token": "${token}",
        "cmd": "GET",
        "dbName": "${dbName}",
        "rel": "${relName}",
        "jsonStr": ${jsonObj}
    }`;
}




// Execute API command
function executeCommand(reqString, dbBaseUrl, apiEndPointUrl) {
    var resultObj;
    jQuery.ajaxSetup({async:false});
    $.post(dbBaseUrl + apiEndPointUrl, reqString, function(result) {
        resultObj = JSON.parse(result);
    }).fail(function(result) {
        resultObj = JSON.parse(result.responseText);
    });
    jQuery.ajaxSetup({async:true});
    return resultObj;
}

// Check if Roll No exists
function checkRollNo() {
    var rollNo = $("#rollNo").val().trim();
    if (rollNo === "") return;

    var getReq = createGETRequest("90934924|-31949249279506419|90959370",
        "SCHOOL_DB", "STUDENT_TABLE", `{"rollNo": "${rollNo}"}`);

    var res = executeCommand(getReq, "http://api.login2explore.com:5577", "/api/irl");

    if (res.data && res.data.length > 0) {
        // Roll exists → populate data, disable Save
        var data = res.data[0];
        $("#fullName").val(data.fullName).prop("disabled", false);
        $("#className").val(data.className).prop("disabled", false);
        $("#birthDate").val(data.birthDate).prop("disabled", false);
        $("#address").val(data.address).prop("disabled", false);
        $("#enrollDate").val(data.enrollDate).prop("disabled", false);

        $("#rollNo").prop("disabled", true);
        $("#saveBtn").prop("disabled", true); // Save disabled
        $("#updateBtn").prop("disabled", false); // Update enabled
        $("#fullName").focus();
    } else {
        // Roll not exist → enable fields for new entry
        $("#fullName, #className, #birthDate, #address, #enrollDate").prop("disabled", false).val("");
        $("#saveBtn").prop("disabled", false); // Save enabled
        $("#updateBtn").prop("disabled", true); // Update disabled
        $("#fullName").focus();
    }
}





// Save button
function saveStudent() {
    var rollNo = $("#rollNo").val().trim();
    if (!rollNo) { alert("Roll No Required!"); $("#rollNo").focus(); return; }

    // Double check DB before saving
    var getReq = createGETRequest("90934924|-31949249279506419|90959370",
        "SCHOOL_DB", "STUDENT_TABLE", `{"rollNo": "${rollNo}"}`);
    var res = executeCommand(getReq, "http://api.login2explore.com:5577", "/api/irl");

    if (res.data && res.data.length > 0) {
        alert("Roll No already exists! Cannot save duplicate.");
        $("#rollNo").focus();
        return;
    }

    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") return;

    var putReqStr = createPUTRequest("90934924|-31949249279506419|90959370",
        jsonStr, "SCHOOL_DB", "STUDENT_TABLE");

    alert(putReqStr);
    var resultObj = executeCommand(putReqStr, "http://api.login2explore.com:5577", "/api/iml");
    alert(JSON.stringify(resultObj));
    resetForm();
}









// Update button
function updateStudent() {
    var jsonStr = validateAndGetFormData();
    if(jsonStr === "") return;

    var recNo = $("#rollNo").val().trim();
    var updateReqStr = createUPDATERequest("90934924|-31949249279506419|90959370",
        jsonStr, "SCHOOL_DB", "STUDENT_TABLE", recNo);

    alert(updateReqStr);
    var resultObj = executeCommand(updateReqStr, "http://api.login2explore.com:5577", "/api/iml");
    alert(JSON.stringify(resultObj));
    resetForm();
}




// Bind Roll No blur
$(document).ready(function(){
    $("#rollNo").focus();
    $("#rollNo").on("blur", checkRollNo);
});
