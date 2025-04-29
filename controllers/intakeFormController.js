const { poolConnect, sql, pool } = require("../config/db");

exports.submitIntakeForm = async (req, res) => {
  try {
    await poolConnect;

    const data = req.body;
    let result=null;

    const formatDate = (input) => {
      if (!input) return null;
      const date = new Date(input);
      return isNaN(date) ? null : date;
    };

    const request = pool.request()
      .input("PatientName", sql.NVarChar(255), data.PatientName)
      .input("Address", sql.NVarChar(255), data.Address)
      .input("City", sql.NVarChar(100), data.City)
      .input("State", sql.NVarChar(100), data.State)
      .input("Zip", sql.NVarChar(20), data.Zip)
      .input("Phone", sql.NVarChar(50), data.Phone)
      .input("Email", sql.NVarChar(255), data.Email)
      .input("Insurance", sql.NVarChar(255), data.Insurance)
      .input("PolicyNumber", sql.VarChar(255), data.PolicyNumber)
      .input("Residence_Access_Notes", sql.NVarChar(sql.MAX), data.Residence_Access_Notes)
      .input("Preference_contact_method", sql.NVarChar(sql.MAX), data.Preference_contact_method)
      .input("IsAnimal", sql.Bit, data.IsAnimal)
      .input("AnimalType", sql.VarChar(255), data.AnimalType)
      .input("PCPFirstName", sql.VarChar(255), data.PCPFirstName)
      .input("PCPLastName", sql.VarChar(255), data.PCPLastName)
      .input("NPI", sql.VarChar(255), data.NPI)
      .input("PCPAddress", sql.NVarChar(255), data.PCPAddress)
      .input("PCPCity", sql.NVarChar(100), data.PCPCity)
      .input("PCPState", sql.NVarChar(100), data.PCPState)
      .input("PCPZip", sql.NVarChar(20), data.PCPZip)
      .input("WoundCareDoctor", sql.VarChar(255), data.WoundCareDoctor)
      .input("InfusionDoctor", sql.VarChar(255), data.InfusionDoctor)
      .input("EmergencyContactName", sql.VarChar(255), data.EmergencyContactName)
      .input("EmergencyContactAddress", sql.VarChar(255), data.EmergencyContactAddress)
      .input("EmergencyContactCity", sql.VarChar(255), data.EmergencyContactCity)
      .input("EmergencyContactState", sql.VarChar(255), data.EmergencyContactState)
      .input("EmergencyContactZip", sql.VarChar(255), data.EmergencyContactZip)
      .input("EmergencyContactPhone", sql.VarChar(255), data.EmergencyContactPhone)
      .input("DischargeDate", sql.Date, formatDate(data.DischargeDate))
      .input("Pharmacy", sql.NVarChar(255), data.Pharmacy)
      .input("IsSmoker", sql.Bit, data.IsSmoker)
      .input("IsInKinnser", sql.Bit, data.IsInKinnser)
      .input("IsPecosCertified", sql.Bit, data.IsPecosCertified)
      .input("ReferralReceived", sql.Bit, data.ReferralReceived)
      .input("HPReceived", sql.Bit, data.HPReceived)
      .input("F2FReceived", sql.Bit, data.F2FReceived)
      .input("IsNursing", sql.Bit, data.IsNursing)
      .input("IsPhysicalTherapy", sql.Bit, data.IsPhysicalTherapy)
      .input("IsOccupationalTherapy", sql.Bit, data.IsOccupationalTherapy)
      .input("IsSpeechTherapy", sql.Bit, data.IsSpeechTherapy)
      .input("IsHomeHealthAide", sql.Bit, data.IsHomeHealthAide)
      .input("IsMedicalSocialWorker", sql.Bit, data.IsMedicalSocialWorker)
      .input("ISPV", sql.Bit, data.ISPV)
      .input("ISPIBB", sql.Bit, data.ISPIBB)
      .input("ISCentralLine", sql.Bit, data.ISCentralLine)
      .input("WoundCare", sql.Bit, data.WoundCare)
      .input("Infusion", sql.Bit, data.Infusion)
      .input("Oxygen", sql.Bit, data.Oxygen)
      .input("OxygenSupplyCompany", sql.VarChar(255), data.OxygenSupplyCompany)
      .input("TrachPEG", sql.Bit, data.TrachPEG)
      .input("TrachDoctor", sql.VarChar(255), data.TrachDoctor)
      .input("FacilityName", sql.VarChar(255), data.FacilityName)
      .input("Casemanager", sql.NVarChar(sql.MAX), data.Casemanager)
      .input("PhysicianId",sql.Int,data.PhysicianId);

    if (data.HtmlExtractedId) {
      request.input("IntakeFormId", sql.Int, data.HtmlExtractedId);
      result = await request.query(`
        UPDATE IntakeForm
        SET 
          PatientName = @PatientName,
          Address = @Address,
          City = @City,
          State = @State,
          Zip = @Zip,
          Phone = @Phone,
          Email = @Email,
          Insurance = @Insurance,
          PolicyNumber = @PolicyNumber,
          Residence_Access_Notes = @Residence_Access_Notes,
          Preference_contact_method = @Preference_contact_method,
          IsAnimal = @IsAnimal,
          AnimalType = @AnimalType,
          PCPFirstName = @PCPFirstName,
          PCPLastName = @PCPLastName,
          NPI = @NPI,
          PCPAddress = @PCPAddress,
          PCPCity = @PCPCity,
          PCPState = @PCPState,
          PCPZip = @PCPZip,
          WoundCareDoctor = @WoundCareDoctor,
          InfusionDoctor = @InfusionDoctor,
          EmergencyContactName = @EmergencyContactName,
          EmergencyContactAddress = @EmergencyContactAddress,
          EmergencyContactCity = @EmergencyContactCity,
          EmergencyContactState = @EmergencyContactState,
          EmergencyContactZip = @EmergencyContactZip,
          EmergencyContactPhone = @EmergencyContactPhone,
          DischargeDate = @DischargeDate,
          Pharmacy = @Pharmacy,
          IsSmoker = @IsSmoker,
          IsInKinnser = @IsInKinnser,
          IsPecosCertified = @IsPecosCertified,
          ReferralReceived = @ReferralReceived,
          HPReceived = @HPReceived,
          F2FReceived = @F2FReceived,
          IsNursing = @IsNursing,
          IsPhysicalTherapy = @IsPhysicalTherapy,
          IsOccupationalTherapy = @IsOccupationalTherapy,
          IsSpeechTherapy = @IsSpeechTherapy,
          IsHomeHealthAide = @IsHomeHealthAide,
          IsMedicalSocialWorker = @IsMedicalSocialWorker,
          ISPV = @ISPV,
          ISPIBB = @ISPIBB,
          ISCentralLine = @ISCentralLine,
          WoundCare = @WoundCare,
          Infusion = @Infusion,
          Oxygen = @Oxygen,
          OxygenSupplyCompany = @OxygenSupplyCompany,
          TrachPEG = @TrachPEG,
          TrachDoctor = @TrachDoctor,
          FacilityName = @FacilityName,
          Casemanager = @Casemanager,
          PhysicianId=@PhysicianId,
          ModifiedOn=GetDate()
          OUTPUT INSERTED.IntakeFormId
        WHERE IntakeFormId = @IntakeFormId
      `);
    } else {
       result = await request.query(`
        INSERT INTO IntakeForm (
          PatientName, Address, City, State, Zip, Phone, Email, Insurance, PolicyNumber,
          Residence_Access_Notes, Preference_contact_method, IsAnimal, AnimalType,
          PCPFirstName,PCPLastName, NPI, PCPAddress, PCPCity, PCPState, PCPZip,
          WoundCareDoctor, InfusionDoctor,
          EmergencyContactName, EmergencyContactAddress, EmergencyContactCity,
          EmergencyContactState, EmergencyContactZip, EmergencyContactPhone,
          DischargeDate, Pharmacy, IsSmoker, IsInKinnser, IsPecosCertified,
          ReferralReceived, HPReceived, F2FReceived,
          IsNursing, IsPhysicalTherapy, IsOccupationalTherapy, IsSpeechTherapy,
          IsHomeHealthAide, IsMedicalSocialWorker, ISPV, ISPIBB, ISCentralLine,
          WoundCare, Infusion, Oxygen, OxygenSupplyCompany,
          TrachPEG, TrachDoctor, FacilityName, Casemanager,PhysicianId,CreatedOn
        ) OUTPUT INSERTED.IntakeFormId
        VALUES (
          @PatientName, @Address, @City, @State, @Zip, @Phone, @Email, @Insurance, @PolicyNumber,
          @Residence_Access_Notes, @Preference_contact_method, @IsAnimal, @AnimalType,
          @PCPFirstName,@PCPLastName, @NPI, @PCPAddress, @PCPCity, @PCPState, @PCPZip,
          @WoundCareDoctor, @InfusionDoctor,
          @EmergencyContactName, @EmergencyContactAddress, @EmergencyContactCity,
          @EmergencyContactState, @EmergencyContactZip, @EmergencyContactPhone,
          @DischargeDate, @Pharmacy, @IsSmoker, @IsInKinnser, @IsPecosCertified,
          @ReferralReceived, @HPReceived, @F2FReceived,
          @IsNursing, @IsPhysicalTherapy, @IsOccupationalTherapy, @IsSpeechTherapy,
          @IsHomeHealthAide, @IsMedicalSocialWorker, @ISPV, @ISPIBB, @ISCentralLine,
          @WoundCare, @Infusion, @Oxygen, @OxygenSupplyCompany,
          @TrachPEG, @TrachDoctor, @FacilityName, @Casemanager,@PhysicianId,GetDate()
        )
      `);
    }
    const insertedId = result.recordset[0].IntakeFormId;
    if (data.PCPFirstName && data.PCPLastName) {
      const fullName = `${data.PCPLastName.trim()} ${data.PCPFirstName.trim()}`;
      await insertPhysicianIfNotExists(fullName);
    }

    res.status(200).json({ success: true, message: "Form processed successfully",IntakeFormId : insertedId });

  } catch (error) {
    console.error("Insert/Update Error:", error);
    res.status(500).json({ success: false, message: "Failed to process intake form" });
  }
};


exports.saveHtmlContent = async (req, res) => {
  try {
    await poolConnect;
    const { patientName, htmlBase64 } = req.body;

    // Decode Base64 safely
    let decodedHtml;
    try {
      decodedHtml = Buffer.from(htmlBase64, "base64").toString("utf-8");
    } catch (decodeErr) {
      return res.status(400).json({ success: false, message: "Invalid base64 HTML input." });
    }

    // Basic sanitization: Remove NULL chars and trim
    decodedHtml = decodedHtml.replace(/\0/g, "").trim();

    // Optional: Strip non-printable ASCII if needed
    // decodedHtml = decodedHtml.replace(/[^\x09\x0A\x0D\x20-\x7E\xA0-\uFFFF]/g, '');

    const result =await pool.request()
      .input("PatientName", sql.NVarChar(255), patientName)
      .input("HtmlContent", sql.NVarChar(sql.MAX), decodedHtml)
      .query(`
        INSERT INTO IntakeForm (PatientName, HtmlExtractedContent,CreatedOn)
        VALUES (@PatientName, @HtmlContent,getDate());
        
    SELECT SCOPE_IDENTITY() AS InsertedId;
      `);
      const insertedId = result.recordset[0].InsertedId;
    res.status(200).json({ success: true, message: "HTML saved successfully.", id: insertedId  });
  } catch (error) {
    console.error("Save HTML Error:", error);
    res.status(500).json({ success: false, message: "Failed to save HTML content." });
  }
};

exports.getAllIntakeForms = async (req, res) => {
  try {
    await poolConnect;

    const result = await pool.request().query(`
      SELECT IntakeFormId, PatientName, PCPFirstName,PCPLastName, CreatedOn
      FROM IntakeForm
      ORDER BY CreatedOn DESC
    `);

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error("Error fetching intake forms:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getIntakeFormById = async (req, res) => {
  try {
    const id = req.params.id;

    await poolConnect;
    const result = await pool.request()
      .input("IntakeFormId", sql.Int, id)
      .query("SELECT * FROM IntakeForm WHERE IntakeFormId = @IntakeFormId");

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Form not found" });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error("Fetch form by ID error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// controllers/intakeFormController.js
exports.updateIntakeForm = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const formatDate = (input) => {
      if (!input) return null;
      const date = new Date(input);
      return isNaN(date) ? null : date;
    };
    await poolConnect;
    await pool.request()
      .input("IntakeFormId", sql.Int, id)
      .input("PatientName", sql.NVarChar(255), data.PatientName)
      .input("Address", sql.NVarChar(255), data.Address)
      .input("City", sql.NVarChar(100), data.City)
      .input("State", sql.NVarChar(100), data.State)
      .input("Zip", sql.NVarChar(20), data.Zip)
      .input("Phone", sql.NVarChar(50), data.Phone)
      .input("Email", sql.NVarChar(255), data.Email)
      .input("Insurance", sql.NVarChar(255), data.Insurance)
      .input("PolicyNumber", sql.VarChar(255), data.PolicyNumber)
      .input("Residence_Access_Notes", sql.NVarChar(sql.MAX), data.Residence_Access_Notes)
      .input("Preference_contact_method", sql.NVarChar(sql.MAX), data.Preference_contact_method)
      .input("IsAnimal", sql.Bit, data.IsAnimal)
      .input("AnimalType", sql.VarChar(255), data.AnimalType)
      .input("PCPFirstName", sql.VarChar(255), data.PCPFirstName)
      .input("PCPLastName", sql.VarChar(255), data.PCPLastName)
      .input("NPI", sql.VarChar(255), data.NPI)
      .input("PCPAddress", sql.NVarChar(255), data.PCPAddress)
      .input("PCPCity", sql.NVarChar(100), data.PCPCity)
      .input("PCPState", sql.NVarChar(100), data.PCPState)
      .input("PCPZip", sql.NVarChar(20), data.PCPZip)
      .input("WoundCareDoctor", sql.VarChar(255), data.WoundCareDoctor)
      .input("InfusionDoctor", sql.VarChar(255), data.InfusionDoctor)
      .input("EmergencyContactName", sql.VarChar(255), data.EmergencyContactName)
      .input("EmergencyContactAddress", sql.VarChar(255), data.EmergencyContactAddress)
      .input("EmergencyContactCity", sql.VarChar(255), data.EmergencyContactCity)
      .input("EmergencyContactState", sql.VarChar(255), data.EmergencyContactState)
      .input("EmergencyContactZip", sql.VarChar(255), data.EmergencyContactZip)
      .input("EmergencyContactPhone", sql.VarChar(255), data.EmergencyContactPhone)
      .input("DischargeDate", sql.Date, formatDate(data.DischargeDate))
      .input("Pharmacy", sql.NVarChar(255), data.Pharmacy)
      .input("IsSmoker", sql.Bit, data.IsSmoker)
      .input("IsInKinnser", sql.Bit, data.IsInKinnser)
      .input("IsPecosCertified", sql.Bit, data.IsPecosCertified)
      .input("ReferralReceived", sql.Bit, data.ReferralReceived)
      .input("HPReceived", sql.Bit, data.HPReceived)
      .input("F2FReceived", sql.Bit, data.F2FReceived)
      .input("IsNursing", sql.Bit, data.IsNursing)
      .input("IsPhysicalTherapy", sql.Bit, data.IsPhysicalTherapy)
      .input("IsOccupationalTherapy", sql.Bit, data.IsOccupationalTherapy)
      .input("IsSpeechTherapy", sql.Bit, data.IsSpeechTherapy)
      .input("IsHomeHealthAide", sql.Bit, data.IsHomeHealthAide)
      .input("IsMedicalSocialWorker", sql.Bit, data.IsMedicalSocialWorker)
      .input("ISPV", sql.Bit, data.ISPV)
      .input("ISPIBB", sql.Bit, data.ISPIBB)
      .input("ISCentralLine", sql.Bit, data.ISCentralLine)
      .input("WoundCare", sql.Bit, data.WoundCare)
      .input("Infusion", sql.Bit, data.Infusion)
      .input("Oxygen", sql.Bit, data.Oxygen)
      .input("OxygenSupplyCompany", sql.VarChar(255), data.OxygenSupplyCompany)
      .input("TrachPEG", sql.Bit, data.TrachPEG)
      .input("TrachDoctor", sql.VarChar(255), data.TrachDoctor)
      .input("FacilityName", sql.VarChar(255), data.FacilityName)
      .input("Casemanager", sql.NVarChar(sql.MAX), data.Casemanager)
      .input("PhysicianId",sql.Int,data.PhysicianId)

      .query(`
        UPDATE IntakeForm
        SET 
          PatientName = @PatientName,
          Address = @Address,
          City = @City,
          State = @State,
          Zip = @Zip,
          Phone = @Phone,
          Email = @Email,
          Insurance = @Insurance,
          PolicyNumber = @PolicyNumber,
          Residence_Access_Notes = @Residence_Access_Notes,
          Preference_contact_method = @Preference_contact_method,
          IsAnimal = @IsAnimal,
          AnimalType = @AnimalType,
          PCPFirstName = @PCPFirstName,
          PCPLastName = @PCPLastName,
          NPI = @NPI,
          PCPAddress = @PCPAddress,
          PCPCity = @PCPCity,
          PCPState = @PCPState,
          PCPZip = @PCPZip,
          WoundCareDoctor = @WoundCareDoctor,
          InfusionDoctor = @InfusionDoctor,
          EmergencyContactName = @EmergencyContactName,
          EmergencyContactAddress = @EmergencyContactAddress,
          EmergencyContactCity = @EmergencyContactCity,
          EmergencyContactState = @EmergencyContactState,
          EmergencyContactZip = @EmergencyContactZip,
          EmergencyContactPhone = @EmergencyContactPhone,
          DischargeDate = @DischargeDate,
          Pharmacy = @Pharmacy,
          IsSmoker = @IsSmoker,
          IsInKinnser = @IsInKinnser,
          IsPecosCertified = @IsPecosCertified,
          ReferralReceived = @ReferralReceived,
          HPReceived = @HPReceived,
          F2FReceived = @F2FReceived,
          IsNursing = @IsNursing,
          IsPhysicalTherapy = @IsPhysicalTherapy,
          IsOccupationalTherapy = @IsOccupationalTherapy,
          IsSpeechTherapy = @IsSpeechTherapy,
          IsHomeHealthAide = @IsHomeHealthAide,
          IsMedicalSocialWorker = @IsMedicalSocialWorker,
          ISPV = @ISPV,
          ISPIBB = @ISPIBB,
          ISCentralLine = @ISCentralLine,
          WoundCare = @WoundCare,
          Infusion = @Infusion,
          Oxygen = @Oxygen,
          OxygenSupplyCompany = @OxygenSupplyCompany,
          TrachPEG = @TrachPEG,
          TrachDoctor = @TrachDoctor,
          FacilityName = @FacilityName,
          Casemanager = @Casemanager,
          PhysicianId=@PhysicianId,
          ModifiedOn=GetDate()
        WHERE IntakeFormId = @IntakeFormId
      `);
      if (data.PCPFirstName && data.PCPLastName) {
        const fullName = `${data.PCPLastName.trim()} ${data.PCPFirstName.trim()}`;
        await insertPhysicianIfNotExists(fullName);
      }
  
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Update failed:", err);
    res.status(500).json({ error: "Failed to update intake form" });
  }
};

exports.uploadEmrbyId= async (req, res) =>{
  const { id } = req.params;

  try {
    await poolConnect;

    const result = await pool.request()
      .input("IntakeFormId", sql.Int, id)
      .query(`
        SELECT
          [IntakeFormId], [PatientName], [Address], [City], [State], [Zip], [Phone], [Email],
          [Insurance], [PolicyNumber], [Residence_Access_Notes], [Preference_contact_method],
          [IsAnimal], [AnimalType], [PCPFirstName],[PCPLastName], [NPI], [PCPAddress], [PCPCity], [PCPState], [PCPZip],
          [WoundCareDoctor], [InfusionDoctor], [EmergencyContactName], [EmergencyContactAddress],
          [EmergencyContactCity], [EmergencyContactState], [EmergencyContactZip], [EmergencyContactPhone],
          [DischargeDate], [Pharmacy], [IsSmoker], [IsInKinnser], [IsPecosCertified], [ReferralReceived],
          [HPReceived], [F2FReceived], [IsNursing], [IsPhysicalTherapy], [IsOccupationalTherapy],
          [IsSpeechTherapy], [IsHomeHealthAide], [IsMedicalSocialWorker], [ISPV], [ISPIBB], [ISCentralLine],
          [WoundCare], [Infusion], [Oxygen], [OxygenSupplyCompany], [TrachPEG], [TrachDoctor],
          [FacilityName], [Casemanager], [HtmlExtractedContent], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]
        FROM [dbo].[IntakeForm]
        WHERE [IntakeFormId] = @IntakeFormId
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ success: false, message: "Form not found" });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }


};

exports.getAllPhysicians = async (req, res) => {
 
  try {
    await poolConnect;

    const result = await pool.request().query(`SELECT * FROM PhysicianList
    `);

    res.status(200).json(result.recordset);
  } catch (err) {
    console.error("Error fetching intake forms:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const insertPhysicianIfNotExists = async (name) => {
  const trimmedName = name.trim();

  const checkResult = await pool.request()
    .input("Name", sql.NVarChar(255), trimmedName)
    .query("SELECT Id FROM PhysicianList WHERE LOWER(Name) = LOWER(@Name)");

  if (checkResult.recordset.length > 0) {
    return checkResult.recordset[0].Id;
  }

  const insertResult = await pool.request()
    .input("Name", sql.NVarChar(255), trimmedName)
    .query(`
      INSERT INTO PhysicianList (Name, Status)
      OUTPUT INSERTED.Id
      VALUES (@Name, 1)
    `);

  return insertResult.recordset[0].Id;
};

