function removeTrailingCommas(jsonString) {
    return jsonString.replace(/,\s*([\]}])/g, "$1") 
                     .replace(/,\s*$/g, ""); 
  }
  
  function parseSafeJSON(jsonString) {
    try {
      const Json = jsonString.replace(/```json|```/g, "").trim(); 
      const cleanedJson = removeTrailingCommas(Json);
      return JSON.parse(cleanedJson);
    } catch (error) {
      console.error("JSON Parsing Error:", error.message);
      return null;
    }
  }
  
  module.exports = { parseSafeJSON };
  