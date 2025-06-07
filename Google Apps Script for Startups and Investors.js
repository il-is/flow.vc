function doPost(e) {
  var sheetName = e.parameter.formType === "Startup" ? "Startups" : "Investors";
  var sheet = SpreadsheetApp.openById("1w_cGblOqZ1swSI9XZsoo5BNjA_8lJ3v_5_Fl-LFfCfk").getSheetByName(sheetName);
  var data = e.parameter;

  if (sheetName === "Startups") {
    sheet.appendRow([
      data.title, data.industry, data.contact, data.submission_date, data.description,
      data.industry_experience, data.team_composition, data.team_cohesion, data.vision_strategy, data.investor_communication,
      data.tech_innovation, data.rnd_infrastructure, data.tech_scaleability,
      data.product_description, data.uniqueness, data.market_size, data.competitive_advantage,
      data.traction, data.investment_amount, data.fund_usage_plan, data.scaling_forecast, data.current_investment, data.capital_structure,
      data.company_registration, data.contractual_base, data.no_disputes, data.licenses_compliance, data.ip_clarity, data.risks
    ]);
  } else if (sheetName === "Investors") {
    sheet.appendRow([
      data.name, data.investor_type, data.investment_range, data.sectors, data.investment_experience, data.geography,
      data.expected_return, data.preferred_stage, data.additional_info
    ]);
  }

  return ContentService.createTextOutput("Успех");
}