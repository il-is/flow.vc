function doPost(e) {
  var sheetName = e.parameter.formType === "Startup" ? "Startups" : "Investors";
  var sheet = SpreadsheetApp.openById("1w_cGblOqZ1swSI9XZsoo5BNjA_8lJ3v_5_Fl-LFfCfk").getSheetByName(sheetName);
  var data = e.parameter;
  var folderId = "YOUR_GOOGLE_DRIVE_FOLDER_ID"; // Замените на ID папки Google Drive
  var folder = DriveApp.getFolderById(folderId);
  var fileUrls = [];

  // Загрузка файлов на Google Drive
  if (e.postData && e.postData.contents) {
    var files = e.files || {};
    for (var fileName in files) {
      var fileBlob = Utilities.newBlob(Utilities.base64Decode(files[fileName].data), files[fileName].mimeType, fileName);
      var file = folder.createFile(fileBlob);
      fileUrls.push(file.getUrl());
    }
  }

  // Сохранение данных в Google Sheets
  if (sheetName === "Startups") {
    sheet.appendRow([
      data.title, data.industry, data.contact, data.submission_date, data.description,
      data.industry_experience, data.team_composition, data.team_cohesion, data.vision_strategy, data.investor_communication,
      data.tech_innovation, data.rnd_infrastructure, data.tech_scalability,
      data.product_description, data.uniqueness, data.market_size, data.competitive_advantage,
      data.traction, data.investment_amount, data.fund_usage_plan, data.scaling_forecast, data.current_investments, data.capital_structure,
      data.company_registration, data.contractual_base, data.no_disputes, data.licenses_compliance, data.ip_clarity, data.risks,
      fileUrls.join(", ") // Ссылки на файлы
    ]);
  } else if (sheetName === "Investors") {
    sheet.appendRow([
      data.name, data.investor_type, data.investment_range, data.sectors, data.investment_experience, data.geography,
      data.expected_return, data.preferred_stage, data.additional_info,
      fileUrls.join(", ") // Ссылки на файлы
    ]);
  }

  return ContentService.createTextOutput(JSON.stringify({status: "success", files: fileUrls}));
}